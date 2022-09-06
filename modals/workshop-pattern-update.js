const fs = require('node:fs')

module.exports = {
	customId: 'workshop-pattern-update',
	async execute(interaction) {
		const pattern = interaction.fields.getTextInputValue('patternInput')

		const patternArray = pattern.split('\n').map(e => {
			const arr = e.split('\t')

			if (arr[1] == '' || arr[1].charAt(0) == 'C') {
				return { item: arr[0], cycle: 0, peakType: 0 }
			}

			const cycle = parseInt(arr[1].charAt(0))
			const type = arr[1].substring(1).trim()

			if (type == 'Weak') {
				return { item: arr[0], cycle: cycle, peakType: 1 }
			}
			else {
				return { item: arr[0], cycle: cycle, peakType: 2 }
			}
		})

		await interaction.reply('Successfully updated pattern!')

		interaction.client.calculator.updatePattern(patternArray)

		fs.writeFileSync('pattern.json', JSON.stringify(patternArray))
		interaction.client.calculator.calculateSequences()
	},
}