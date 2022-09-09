const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const eorzeanHour = 175 * 1000

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('bestiary')
		.setDescription('Show animal information')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Animal type')
				.setRequired(true)
				.setAutocomplete(true),
		),

	async execute(interaction) {
		const animal = interaction.options.getString('type')
		if (!animalData[animal]) {
			await interaction.reply({ content: `${animal} is not an animal!`, ephemeral: true })
			return
		}
		const animalInfo = animalData[animal]

		await interaction.deferReply()

		const animalEmbed = new EmbedBuilder()
			.setTitle(`${animalInfo.name}  -  Island Bestiary`)
			.setColor('228822')
			.addFields(
				{ name: 'Size', value: animalInfo.size, inline: true },
				{ name: 'Common Leaving', value: animalInfo.common, inline: true },
				{ name: 'Rare Leaving', value: animalInfo.rare, inline: true },
				{ name: 'Time', value: animalInfo.time, inline: true },
				{ name: 'Weather', value: animalInfo.type, inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
			)

		animalEmbed.setImage(animalInfo.url)

		if (animalInfo.special) {
			const time = new Date()

			const animalTimes = generateWeatherWindows(time, animalInfo)
			let animalStr = ''
			animalTimes.forEach(el => {
				const discordTime = (el / 1000).toFixed(0)
				animalStr = animalStr + `<t:${discordTime}:D> at <t:${discordTime}:t>  \u200B <t:${discordTime}:R>\n`
			})

			animalEmbed.addFields(
				{ name: 'Upcoming Spawn Times', value: animalStr, inline: false },
			)
		}

		animalEmbed.addFields({ name: '\u200B', value: '**Location**', inline: false })

		if (animal == 'beachcomb' || animal == 'twinklefleece' || animal == 'paissa' || animal == 'alligator' || animal == 'goobbue') {
			const buggedEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Notice', iconURL: 'https://i.imgur.com/1DbYMXg.png' })
				.setColor('e4d03d')
				.setDescription('*Certain animals are currently bugged and may not spawn in the right weather conditions. Read up on on how to fix it [here](https://www.reddit.com/r/ffxiv/comments/wyqg8q/psa_bug_island_sanctuary_rare_monsters_not/ \'Island Sanctuary Animal Workaround\').*')

			await interaction.editReply({ embeds: [ animalEmbed, buggedEmbed ] })
		}
		else {
			await interaction.editReply({ embeds: [ animalEmbed ] })
		}

		interaction.client.stats.animalsCalled = interaction.client.stats.animalsCalled + 1
	},
}

// Generate weather times that intersect with animal times
function generateWeatherWindows(date, windowData) {
	const weatherTimes = []
	const startTime = generateClosestEorzeanWeatherChange(date)

	let changesPassed = 0
	while (weatherTimes.length < 3) {
		const time = startTime + (changesPassed * eorzeanHour * 8)
		const weatherNum = getWeatherNumber(time)

		if (getWeather(weatherNum) == windowData.type) {
			const eorzeanTime = ((time / eorzeanHour) % 24).toFixed(0)

			if (eorzeanTime >= windowData.start && eorzeanTime < windowData.end) {
				weatherTimes.push(time)
			}
			else if (eorzeanTime < windowData.start && (eorzeanTime + 8) >= windowData.end) {
				weatherTimes.push(time + (windowData.start - eorzeanTime) * eorzeanHour)
			}
			else if (windowData.start > eorzeanTime && windowData.start < (eorzeanTime + 8)) {
				weatherTimes.push(time + (windowData.start - eorzeanTime) * eorzeanHour)
			}
		}

		changesPassed = changesPassed + 1
	}

	return weatherTimes
}

// Find the nearest Eorzean weather change in real time
function generateClosestEorzeanWeatherChange(date) {
	const bells = (date.getTime() / eorzeanHour) % 24
	let timeToChange = 0

	if (bells < 8) {
		timeToChange = (8 - bells)
	}
	else if (bells > 16) {
		timeToChange = (24 - bells)
	}
	else {
		timeToChange = (16 - bells)
	}

	if (timeToChange < 2) {
		return Date.now() - (bells * eorzeanHour)
	}
	else {
		return Date.now() + (timeToChange * eorzeanHour)
	}

}

// Generate the in-game weather number
function getWeatherNumber(date) {
	// Thanks to Rogueadyn's SaintCoinach library for this calculation.
	const unixSeconds = parseInt(date / 1000)
	// Get Eorzea hour for weather start
	const bell = unixSeconds / 175

	// Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
	const increment = (bell + 8 - (bell % 8)) % 24

	// Take Eorzea days since unix epoch
	let totalDays = unixSeconds / 4200
	totalDays = (totalDays << 32) >>> 0

	// 0x64 = 100
	const calcBase = totalDays * 100 + increment

	// 0xB = 11
	const step1 = ((calcBase << 11) ^ calcBase) >>> 0
	const step2 = ((step1 >>> 8) ^ step1) >>> 0

	// 0x64 = 100
	return step2 % 100
}

// Convert the weather number to weather type
function getWeather(number) {
	let window = 0
	let name = ''

	for (let i = 0; i < weatherData.length; i++) {
		window = window + weatherData[i].chance

		if (window > number) {
			name = weatherData[i].name
			break
		}
	}

	return name
}

const weatherData = [
	{ name: 'Clear Skies', chance: 25 },
	{ name: 'Fair Skies', chance: 45 },
	{ name: 'Clouds', chance: 10 },
	{ name: 'Rain', chance: 10 },
	{ name: 'Fog', chance: 5 },
	{ name: 'Showers', chance: 5 },
]

const animalData = {
	lamb: { name: 'Lost Lamb', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Fleece', rare: 'Milk', size: 'Small', url: 'https://i.imgur.com/hDJioVy.jpg' },
	karakul: { name: 'Ornery Karakul', special: true, type: 'Fair Skies', start: 0, end: 23, time: 'Any', common: 'Milk', rare: 'Fleece', size: 'Small', url: 'https://i.imgur.com/yRAkTW1.jpg' },

	opo: { name: 'Opo-Opo', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Claw', rare: 'Fur', size: 'Small', url: 'https://i.imgur.com/WE4jsuh.jpg' },
	lemur: { name: 'Lemur', special: false, type: 'Any', start: 0, end: 23, time: '6AM - 9AM', common: 'Fur', rare: 'Claw', size: 'Small', url: 'https://i.imgur.com/TDcvu1X.jpg' },

	apkallu: { name: 'Apkallu', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Fleece', rare: 'Egg', size: 'Small', url: 'https://i.imgur.com/azBGqyR.jpg' },
	apkalluParadise: { name: 'Apkallu of Paradise', special: false, type: 'Any', start: 0, end: 23, time: '12PM - 3PM', common: 'Egg', rare: 'Fleece', size: 'Small', url: 'https://i.imgur.com/wMuwDzh.jpg' },

	squirrel: { name: 'Ground Squirrel', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Claw', rare: 'Fur', size: 'Small', url: 'https://i.imgur.com/WqDILOo.jpg' },
	marmot: { name: 'Star Marmot', special: false, type: 'Any', start: 0, end: 23, time: '9AM - 12PM', common: 'Fur', rare: 'Claw', size: 'Small', url: 'https://i.imgur.com/vWhOqDW.jpg' },

	beachcomb: { name: 'Beachcomb', special: true, type: 'Rain', start: 0, end: 3, time: '12AM - 3AM', common: 'Carapace', rare: 'Claw', size: 'Small', url: 'https://i.imgur.com/6lWYkMH.jpg' },

	coblyn: { name: 'Coblyn', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Fang', rare: 'Carapace', size: 'Small', url: 'https://i.imgur.com/ozK9Y2r.jpg' },
	coblynYellow: { name: 'Yellow Coblyn', special: true, type: 'Fog', start: 0, end: 23, time: 'Any', common: 'Carapace', rare: 'Fang', size: 'Small', url: 'https://i.imgur.com/1B1Ox9J.jpg' },

	twinklefleece: { name: 'Twinklefleece', special: true, type: 'Fog', start: 18, end: 21, time: '6PM - 9PM', common: 'Fleece', rare: 'Fur', size: 'Small', url: 'https://i.imgur.com/OeorKu3.jpg' },

	dodo: { name: 'Wild Dodo', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Egg', rare: 'Feather', size: 'Medium', url: 'https://i.imgur.com/mYaMasZ.jpg' },
	dodoParadise: { name: 'Dodo of Paradise', special: false, type: 'Any', start: 0, end: 23, time: '3PM - 6PM', common: 'Feather', rare: 'Egg', size: 'Medium', url: 'https://i.imgur.com/nY81qZn.jpg' },

	doe: { name: 'Island Doe', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Fur', rare: 'Milk', size: 'Medium', url: 'https://i.imgur.com/Anf5gqi.jpg' },
	stag: { name: 'Island Stag', special: false, type: 'Any', start: 0, end: 23, time: '6PM - 9PM', common: 'Fur', rare: 'Horn', size: 'Medium', url: 'https://i.imgur.com/7Q12D1U.jpg' },

	chocobo: { name: 'Chocobo', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Fur', rare: 'Feather', size: 'Medium', url: 'https://i.imgur.com/HJP6uhc.jpg' },
	chocoboBlack: { name: 'Black Chocobo', special: true, type: 'Clear Skies', start: 0, end: 23, time: 'Any', common: 'Feather', rare: 'Fur', size: 'Medium', url: 'https://i.imgur.com/6rR3stt.jpg' },

	glyptodonPup: { name: 'Glyptodon Pup', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Carapace', rare: 'Claw', size: 'Medium', url: 'https://i.imgur.com/LOc1aNi.jpg' },
	glyptodon: { name: 'Glyptodon', special: false, type: 'Any', start: 0, end: 23, time: '12AM - 3AM', common: 'Claw', rare: 'Carapace', size: 'Medium', url: 'https://i.imgur.com/JJsz5XF.jpg' },

	paissa: { name: 'Paissa', special: true, type: 'Fair Skies', start: 12, end: 15, time: '12PM - 3PM', common: 'Claw', rare: 'Fleece', size: 'Medium', url: 'https://i.imgur.com/YygYnHb.jpg' },

	aurochs: { name: 'Aurochs', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Milk', rare: 'Horn', size: 'Large', url: 'https://i.imgur.com/WtN1KUr.jpg' },
	buffalo: { name: 'Grand Buffalo', special: true, type: 'Clouds', start: 0, end: 23, time: 'Any', common: 'Horn', rare: 'Milk', size: 'Large', url: 'https://i.imgur.com/YxQHWjb.jpg' },

	nanny: { name: 'Island Nanny', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Milk', rare: 'Horn', size: 'Large', url: 'https://i.imgur.com/Xya7Dj5.jpg' },
	billy: { name: 'Island Billy', special: false, type: 'Any', start: 0, end: 23, time: '3AM - 6AM', common: 'Horn', rare: 'Fleece', size: 'Large', url: 'https://i.imgur.com/eH8etpA.jpg' },

	goobbue: { name: 'Goobbue', special: true, type: 'Clouds', start: 9, end: 12, time: '9AM - 12PM', common: 'Fang', rare: 'Claw', size: 'Large', url: 'https://i.imgur.com/KuxD54l.jpg' },

	alligator: { name: 'Alligator', special: true, type: 'Showers', start: 6, end: 9, time: '6AM - 9AM', common: 'Claw', rare: 'Fang', size: 'Large', url: 'https://i.imgur.com/0Z2dCRK.jpg' },

	back: { name: 'Blue Back', special: false, type: 'Any', start: 0, end: 23, time: 'Any', common: 'Egg', rare: 'Feather', size: 'Large', url: 'https://i.imgur.com/ha4IYqv.jpg' },
	backGold: { name: 'Gold Back', special: true, type: 'Rain', start: 0, end: 23, time: 'Any', common: 'Feather', rare: 'Egg', size: 'Large', url: 'https://i.imgur.com/P2mDYXl.jpg' },
}