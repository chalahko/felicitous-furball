const fs = require('node:fs')

module.exports = {
	customId: 'workshop-popularity-update',
	async execute(interaction) {
		const pattern = interaction.fields.getTextInputValue('popularityInput')

		const popArray = pattern.split('\n').map(e => {
			const arr = e.split('\t')
			return { item: arr[0], pop: parseInt(arr[1]) }
		})

		await interaction.reply('Successfully updated popularity!')

		interaction.client.calculator.updatePopularity(popArray)

		fs.writeFileSync('popularity.json', JSON.stringify(popArray))
		interaction.client.calculator.calculateSequences()
	},
}