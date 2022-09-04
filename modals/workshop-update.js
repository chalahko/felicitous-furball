const { EmbedBuilder, Collection } = require('discord.js')

module.exports = {
	customId: 'workshop-update',
	async execute(interaction) {
		const cowry = '<:cowry:1015694371749908572>'
		const cycle = interaction.fields.getTextInputValue('cycleInput')
		const grooveValues = interaction.fields.getTextInputValue('grooveValueInput')
		const grooveSequences = interaction.fields.getTextInputValue('grooveSequenceInput')
		const cowrieValues = interaction.fields.getTextInputValue('cowrieValueInput')
		const cowrieSequences = interaction.fields.getTextInputValue('cowrieSequenceInput')

		if (cycle < 5 && (!grooveValues || !grooveSequences)) {
			await interaction.reply('Cycles 1-4 require **Groove-Mover** values!')
			return
		}
		else if (cycle < 1 || cycle > 7) {
			await interaction.reply('Cycle cannot be outside of 1-7 range!')
			return
		}

		if ((grooveValues && grooveSequences && cowrieValues && cowrieSequences) || (cycle > 4 && cowrieValues && cowrieSequences)) {
			const gValues = grooveValues.split('\n').map(e => {
				return `${cowry}  **${e}** \u200b \u200b`
			}).join('\n')

			const gSequences = grooveSequences.split('\n').map(e => {
				return e.split('-').map(el => shorten(el.trim())).join(' ➛ ')
			}).join('\n')

			const cValues = cowrieValues.split('\n').map(e => {
				return `${cowry}  **${e}** \u200b \u200b`
			}).join('\n')

			const cSequences = cowrieSequences.split('\n').map(e => {
				return e.split('-').map(el => shorten(el.trim())).join(' ➛ ')
			}).join('\n')

			if (cSequences.length > 1023) {
				await interaction.reply('Sequence length exceeds Discord limit.')
				return
			}

			const embed = new EmbedBuilder()
				.setTitle(`Island Sanctuary - Workshop Cycle ${cycle}`)

			const fieldArray = []

			if (cycle < 5) {
				fieldArray.push(
					{ name: 'Groove Movers', value: '*Short crafts to increase groove quickly.*' },
					{ name: 'Cowries', value: gValues, inline: true },
					{ name: 'Sequence', value: gSequences, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				)
			}

			fieldArray.push(
				{ name: 'Cowrie Compilers', value: '*Big crafts to maximise cowrie profits.*' },
				{ name: 'Cowries', value: cValues, inline: true },
				{ name: 'Sequence', value: cSequences, inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
			)

			embed.addFields(fieldArray)

			const noteEmbed = new EmbedBuilder()
				.setTitle('Note')
				.setDescription('*Be aware that projected cowrie profits do not take player affected supply changes into account. E.g. if you use Rope for groove early, their value will be diminished until the next week.*')
				.setColor('bfa12a')

			if (cycle == 1) {
				const warningEmbed = new EmbedBuilder()
					.setTitle('Warning')
					.setColor('ee1111')
					.setDescription('It\'s recommended to rest on Cycle 1 so that supply patterns can be recognized.')

				await interaction.reply(({ embeds: [ warningEmbed, embed, noteEmbed ] }))
			}
			else {
				await interaction.reply({ embeds: [ embed, noteEmbed ] })
			}
		}
	},
}

function shorten(str) {
	const abbr = new Collection()
	abbr.set('Wooden Chair', 'W. Chair')
		.set('Grilled Clam', 'G. Clam')
		.set('Baked Pumpkin', 'B. Pumpkin')
		.set('Culinary Knife', 'Cul. Knife')
		.set('Boiled Egg', 'B. Egg')
		.set('Brick Counter', 'B. Counter')
		.set('Bronze Sheep', 'B. Sheep')
		.set('Growth Formula', 'G. Formula')
		.set('Spruce Round Shield', 'Spr. Shield')
		.set('Garnet Rapier', 'G. Rapier')
		.set('Silver Ear Cuffs', 'Ear Cuffs')
		.set('Sweet Popoto', 'Sw. Popoto')
		.set('Parsnip Salad', 'P. Salad')
		.set('Cavalier\'s Hat', 'Cav. Hat')
		.set('Essential Draught', 'Ess. Draught')
		.set('Isleberry Jam', 'Isle Jam')
		.set('Tomato Relish', 'T. Relish')
		.set('Onion Soup', 'O. Soup')
		.set('Islefish Pie', 'Isle Pie')
		.set('Corn Flakes', 'C. Flakes')
		.set('Pickled Radish', 'P. Radish')
		.set('Quartz Ring', 'Q. Ring')
		.set('Porcelain Vase', 'P. Vase')
		.set('Vegetable Juice', 'Veg. Juice')
		.set('Pumpkin Pudding', 'P. Pudding')
		.set('Sheepfluff Rug', 'Sheep Rug')
		.set('Garden Scythe', 'G. Scythe')
		.set('Scale Fingers', 'Sc. Fingers')

	if (abbr.has(str)) {
		return abbr.get(str)
	}
	else {
		return str
	}
}