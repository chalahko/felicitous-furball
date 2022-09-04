module.exports = {
	customId: 'workshop-popularity-update',
	async execute(interaction) {
		const pattern = interaction.fields.getTextInputValue('popularityInput')

		const popArray = pattern.split('\n').map(e => {
			const arr = e.split('\t')
			return { item: arr[0], pop: parseInt(arr[1]) }
		})

		interaction.client.calculator.updatePopularity(popArray)

		interaction.reply('Successfully updated popularity!')
	},
}