const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('cycle')
		.setDescription('Display best workshop cycle crafts')
		.addIntegerOption(option =>
			option.setName('day')
				.setDescription('Cycle day')
				.setRequired(true)
				.addChoices(
					{ name: 'Tuesday', value: 1 },
					{ name: 'Wednesday', value: 2 },
					{ name: 'Thursday', value: 3 },
					{ name: 'Friday', value: 4 },
					{ name: 'Saturday', value: 5 },
					{ name: 'Sunday', value: 6 },
					{ name: 'Monday', value: 7 },
				),
		)
		.setDMPermission(true),

	async execute(interaction) {
		const day = interaction.options.getInteger('day')
		const daySequences = interaction.client.calculator.getSingleDaySequences(day)

		await interaction.deferReply({ ephemeral: true })

		let gValues = ''
		let gSequences = ''
		daySequences.groovers.forEach(seq => {
			gValues = gValues + `**${seq.value}**  \u200B\n`
			gSequences = gSequences + seq.sequence.map(el => {
				return `${shorten(el)}`
			}).join(' ➛ ') + '\n'
		})


		let cValues = ''
		let cSequences = ''
		daySequences.top.forEach(seq => {
			cValues = cValues + `**${seq.value}**  \u200B \u200B\n`
			cSequences = cSequences + seq.sequence.map(el => {
				return `${shorten(el)}`
			}).join(' ➛ ') + '\n'
		})

		const dayEmbed = new EmbedBuilder()
			.setAuthor({ name: `Workshop Day ${day} Sequences`, iconURL: 'https://i.imgur.com/cft3lF4.png' })
			.setColor('5981A7')

		if (day < 5) {
			dayEmbed.addFields(
				{ name: 'Groove', value: '*Short crafts to increase groove quickly. Very similar sequences are discarded for more item variations.*', inline: false },
				{ name: 'Value', value: gValues, inline: true },
				{ name: 'Sequence', value: gSequences, inline: true },
				{ name: 'Cowries', value: '*The top sequences to generate the most cowries. Note: these do account for player supply changes.*', inline: false },
				{ name: 'Value', value: cValues, inline: true },
				{ name: 'Sequence', value: cSequences, inline: true },
			)
		}
		else {
			dayEmbed.addFields(
				{ name: 'Cowries', value: '*The top sequences to generate the most cowries. Note: these do account for player supply changes.*', inline: false },
				{ name: 'Value', value: cValues, inline: true },
				{ name: 'Sequence', value: cSequences, inline: true },
			)
		}

		if (day == 1) {
			const dayOneWarning = new EmbedBuilder()
				.setAuthor({ name: 'Notice', iconURL: 'https://i.imgur.com/1DbYMXg.png' })
				.setColor('e4d03d')
				.setDescription('*Since Day 1 has no **Nonexistent** crafts, it is recommended to rest on Day 1. This allows for more valuable crafting days in the future.*')

			await interaction.editReply({ content: '', embeds: [ dayOneWarning, dayEmbed ], ephemeral: true })
		}
		else if (day == 2) {
			const dayTwoWarning = new EmbedBuilder()
				.setAuthor({ name: 'Notice', iconURL: 'https://i.imgur.com/1DbYMXg.png' })
				.setColor('e4d03d')
				.setDescription('*Due to how Island Sanctuary supply changes, it is impossible to predict Day 2 **Nonexistent** crafts 100% accurately on Day 1. Adjust your plans accordingly.*')

			await interaction.editReply({ content: '', embeds: [ dayTwoWarning, dayEmbed ], ephemeral: true })
		}
		else if (interaction.client.calculator.getLastPeak() < day) {
			const unpredictedWarning = new EmbedBuilder()
				.setAuthor({ name: 'Warning', iconURL: 'https://i.imgur.com/p3UUiKH.png' })
				.setColor('993d3d')
				.setDescription('*You are attempting to get sequences for a Day that cannot be fully predicted. Results will not be accurate!*')

			await interaction.editReply({ content: '', embeds: [ unpredictedWarning, dayEmbed ], ephemeral: true })
		}
		else {
			await interaction.editReply({ content: '', embeds: [ dayEmbed ], ephemeral: true })
		}

		interaction.client.stats.cyclesCalled = interaction.client.stats.cyclesCalled + 1
	},
}

function shorten(str) {
	const abbr = new Collection()
	abbr.set('Wooden Chair', 'Chair')
		.set('Grilled Clam', 'Clam')
		.set('Baked Pumpkin', 'Pumpkin')
		.set('Culinary Knife', 'Knife')
		.set('Boiled Egg', 'Egg')
		.set('Brick Counter', 'Counter')
		.set('Bronze Sheep', 'Sheep')
		.set('Growth Formula', 'Formula')
		.set('Spruce Round Shield', 'Shield')
		.set('Garnet Rapier', 'Rapier')
		.set('Silver Ear Cuffs', 'Ear Cuffs')
		.set('Sweet Popoto', 'Sw. Popoto')
		.set('Parsnip Salad', 'Salad')
		.set('Cavalier\'s Hat', 'Cav. Hat')
		.set('Essential Draught', 'Draught')
		.set('Isleberry Jam', 'Isle Jam')
		.set('Tomato Relish', 'Relish')
		.set('Onion Soup', 'Soup')
		.set('Islefish Pie', 'Isle Pie')
		.set('Corn Flakes', 'Flakes')
		.set('Pickled Radish', 'Radish')
		.set('Quartz Ring', 'Q. Ring')
		.set('Coral Ring', 'C. Ring')
		.set('Porcelain Vase', 'Vase')
		.set('Vegetable Juice', 'Juice')
		.set('Pumpkin Pudding', 'Pudding')
		.set('Sheepfluff Rug', 'Sheep Rug')
		.set('Garden Scythe', 'Scythe')
		.set('Scale Fingers', 'Fingers')

	if (abbr.has(str)) {
		return abbr.get(str)
	}
	else {
		return str
	}
}