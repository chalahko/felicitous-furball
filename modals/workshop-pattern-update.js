module.exports = {
	customId: 'workshop-pattern-update',
	async execute(interaction) {
		const pattern = interaction.fields.getTextInputValue('patternInput')

		const patternArray = pattern.split('\n').map(e => {
			const arr = e.split('\t')

			if (arr[1] == '' || arr[1].charAt(0) == 'C') {
				return { item: arr[0], cycle: 0, typeStrong: false }
			}

			const cycle = parseInt(arr[1].charAt(0))
			const type = arr[1].substring(1).trim()

			if (type == 'Weak') {
				return { item: arr[0], cycle: cycle, typeStrong: false }
			}
			else {
				return { item: arr[0], cycle: cycle, typeStrong: true }
			}
		})

		interaction.client.calculator.updatePattern(patternArray)

		interaction.reply('Successfully updated pattern!')
	},
}