const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const eorzeanHour = 175 * 1000

const weatherData = [
	{ name: 'clearSkies', chance: 25 },
	{ name: 'fairSkies', chance: 45 },
	{ name: 'clouds', chance: 10 },
	{ name: 'rain', chance: 10 },
	{ name: 'fog', chance: 5 },
	{ name: 'showers', chance: 5 },
]

const animalData = {
	karakul: { name: 'Ornery Karakul', type: 'fairSkies', start: 0, end: 23, item: 'Makeshift Net' },
	beachcomb: { name: 'Beachcomb', type: 'rain', start: 0, end: 3, item: 'Makeshift Net' },
	coblyn: { name: 'Yellow Coblyn', type: 'fog', start: 0, end: 24, item: 'Makeshift Net' },
	twinklefleece: { name: 'Twinklefleece', type: 'fog', start: 18, end: 21, item: 'Makeshift Net' },
	paissa: { name: 'Paissa', type: 'fairSkies', start: 12, end: 15, item: 'Makeshift Restraint' },
	chocobo: { name: 'Black Chocobo', type: 'clearSkies', start: 0, end: 23, item: 'Makeshift Restraint' },
	buffalo: { name: 'Grand Buffalo', type: 'clouds', start: 0, end: 23, item: 'Makeshift Soporific' },
	goobbue: { name: 'Goobbue', type: 'clouds', start: 9, end: 12, item: 'Makeshift Soporific' },
	alligator: { name: 'Alligator', type: 'showers', start: 6, end: 9, item: 'Makeshift Soporific' },
	beck: { name: 'Gold Beck', type: 'rain', start: 0, end: 23, item: 'Makeshift Soporific' },
}

const icons = {
	clearSkies: 'https://i.imgur.com/HWjNQBW.png',
	fairSkies: 'https://i.imgur.com/g1Wzks1.png',
	clouds: 'https://i.imgur.com/LTcZJeT.png',
	rain: 'https://i.imgur.com/g7wonfX.png',
	fog: 'https://i.imgur.com/AmMqMhW.png',
	showers: 'https://i.imgur.com/8OVJvsV.png',
}


module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('animal')
		.setDescription('Show the next spawn window for a rare animal')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Animal type')
				.setRequired(true)
				.addChoices(
					{ name: 'Ornery Karakul', value: 'karakul' },
					{ name: 'Beachcomb', value: 'beachcomb' },
					{ name: 'Yellow Coblyn', value: 'coblyn' },
					{ name: 'Twinklefleece', value: 'twinklefleece' },
					{ name: 'Paissa', value: 'paissa' },
					{ name: 'Black Chocobo', value: 'chocobo' },
					{ name: 'Grand Buffalo', value: 'buffalo' },
					{ name: 'Goobbue', value: 'goobbue' },
					{ name: 'Alligator', value: 'alligator' },
					{ name: 'Gold Beck', value: 'beck' },
				),
		),

	async execute(interaction) {
		const animal = interaction.options.getString('type')
		const animalInfo = animalData[animal]

		await interaction.deferReply()

		const time = new Date()

		const animalTimes = generateWeatherWindows(time, animalInfo)
		let animalStr = ''
		animalTimes.forEach(el => {
			const discordTime = (el / 1000).toFixed(0)
			animalStr = animalStr + `<t:${discordTime}:D> at <t:${discordTime}:t>  \u200B <t:${discordTime}:R>\n`
		})

		const animalEmbed = new EmbedBuilder()
			.setAuthor({ name: `${animalInfo.name} Weather Times`, iconURL: icons[animalInfo.type] })
			.setDescription(`*Below are the next five times that ${animalInfo.name} will be able to spawn. Make sure you have your ${animalInfo.item}s at the ready!*`)
			.setColor('228822')
			.addFields([
				{ name: 'Timeframes', value: animalStr },
			])

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
	while (weatherTimes.length < 5) {
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
	const unixSeconds = parseInt(date / 1000);
	// Get Eorzea hour for weather start
	const bell = unixSeconds / 175;

	// Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
	const increment = (bell + 8 - (bell % 8)) % 24;

	// Take Eorzea days since unix epoch
	let totalDays = unixSeconds / 4200;
	totalDays = (totalDays << 32) >>> 0;

	// 0x64 = 100
	const calcBase = totalDays * 100 + increment;

	// 0xB = 11
	const step1 = ((calcBase << 11) ^ calcBase) >>> 0;
	const step2 = ((step1 >>> 8) ^ step1) >>> 0;

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