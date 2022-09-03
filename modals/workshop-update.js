const { EmbedBuilder, Embed } = require('discord.js')

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

		if (grooveValues && grooveSequences && cowrieValues && cowrieSequences) {
			const gValues = grooveValues.split('\n').map(e => {
				return `${cowry}  **${e}** \u200b \u200b`
			}).join('\n')

			const gSequences = grooveSequences.split('\n').map(e => {
				return e.split('-').map(el => {
					return el.replace('Boiled Egg', 'Egg').replace('Culinary Knife', 'Cul. Knife')
				}).join('➛')
			}).join('\n')

			const cValues = cowrieValues.split('\n').map(e => {
				return `${cowry}  **${e}** \u200b \u200b`
			}).join('\n')

			const cSequences = cowrieSequences.split('\n').map(e => {
				return e.split('-').map(el => {
					return `${el}`
				}).join('➛')
			}).join('\n')

			const embed = new EmbedBuilder()
				.setTitle(`Island Sanctuary - Workshop Cycle ${cycle}`)
				.addFields([
					{ name: 'Groove Movers', value: '*Short crafts to increase groove quickly.*' },
					{ name: 'Cowries', value: gValues, inline: true },
					{ name: 'Sequence', value: gSequences, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'Cowrie Compilers', value: '*Big crafts to maximise cowrie profits.*' },
					{ name: 'Cowries', value: cValues, inline: true },
					{ name: 'Sequence', value: cSequences, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				])

			if (cycle == 1) {
				const warningEmbed = new EmbedBuilder()
					.setTitle('Warning')
					.setColor('ee1111')
					.setDescription('It\'s recommended to rest on Cycle 1 so that supply patterns can be recognized.')

				await interaction.reply(({ embeds: [ warningEmbed, embed ] }))
			}
			else {
				await interaction.reply({ embeds: [ embed ] })
			}
		}
	},
}