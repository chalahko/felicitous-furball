const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	global: false,
	data: new SlashCommandBuilder()
		.setName('popularity')
		.setDescription('Input popularity data'),

	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('workshop-popularity-update')
			.setTitle('Workshop Popularity Input')

		const popInput = new TextInputBuilder()
			.setCustomId('popularityInput')
			.setLabel('Excel Popularity Output')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)

		const firstActionRow = new ActionRowBuilder().addComponents(popInput)

		modal.addComponents(firstActionRow)

		await interaction.showModal(modal)
	},
}