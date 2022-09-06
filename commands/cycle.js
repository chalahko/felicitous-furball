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
		),

	async execute(interaction) {
		const cowry = '<:cowry:1015694371749908572>'
		const day = interaction.options.getInteger('day')
		const daySequences = interaction.client.calculator.getSingleDaySequences(day)

		await interaction.reply(`Getting the best sequences for Cycle ${day}`)

		let gValues = ''
		let gSequences = ''
		daySequences.groovers.forEach(seq => {
			gValues = gValues + `${cowry}  **${seq.value}**  \u200B \u200B\n`
			gSequences = gSequences + seq.sequence.map(el => {
				return `${shorten(el)}`
			}).join(' ➛ ') + '\n'
		})


		let cValues = ''
		let cSequences = ''
		daySequences.top.forEach(seq => {
			cValues = cValues + `${cowry} **${seq.value}**  \u200B \u200B\n`
			cSequences = cSequences + seq.sequence.map(el => {
				return `${shorten(el)}`
			}).join(' ➛ ') + '\n'
		})

		const groovers = new EmbedBuilder()
			.setAuthor({ name: `Day ${day} - Best Groove Sequences`, iconURL: 'https://i.imgur.com/cft3lF4.png' })
			.setDescription('*Short crafts to increase groove quickly. Very similar sequences are discarded for more item variations.*')
			.setColor('5981A7')
			.addFields(
				{ name: 'Cowries', value: gValues, inline: true },
				{ name: 'Sequence', value: gSequences, inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
			)

		const tops = new EmbedBuilder()
			.setAuthor({ name: `Day ${day} - Best Cowrie Sequences`, iconURL: 'https://i.imgur.com/cft3lF4.png' })
			.setDescription('*The top sequences to generate the most cowries. Note: these do account for player supply changes.*')
			.setColor('5981A7')
			.addFields(
				{ name: 'Cowries', value: cValues, inline: true },
				{ name: 'Sequence', value: cSequences, inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
			)


		if (day > 4) {
			await interaction.editReply({ content: '', embeds: [ tops ] })
		}
		else if (day == 1) {
			const dayOneWarning = new EmbedBuilder()
				.setTitle('Warning')
				.setColor('ffcc00')
				.setDescription('*Since Day 1 has no **Nonexistent** items, it is recommended to rest on Day 1. This allows for more valuable crafting days in the future.*')

			await interaction.editReply({ content: '', embeds: [ dayOneWarning, groovers, tops ] })
		}
		else if (day == 2) {
			const dayTwoWarning = new EmbedBuilder()
				.setTitle('Warning')
				.setColor('cc3300')
				.setDescription('*Due to how Island Sanctuary supply changes, it is impossible to predict week two peaks accurately on Day 1. Adjust your plans accordingly.*')

			await interaction.editReply({ content: '', embeds: [ dayTwoWarning, groovers, tops ] })
		}
		else {
			await interaction.editReply({ content: '', embeds: [ groovers, tops ] })
		}
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