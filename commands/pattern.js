const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	global: false,
	data: new SlashCommandBuilder()
		.setName('pattern')
		.setDescription('Input pattern data'),

	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('workshop-pattern-update')
			.setTitle('Workshop Pattern Input')

		const patternInput = new TextInputBuilder()
			.setCustomId('patternInput')
			.setLabel('Excel Pattern Output')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)

		const firstActionRow = new ActionRowBuilder().addComponents(patternInput)

		modal.addComponents(firstActionRow)

		await interaction.showModal(modal)
	},
}