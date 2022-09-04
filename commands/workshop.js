const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	global: false,
	data: new SlashCommandBuilder()
		.setName('workshop')
		.setDescription('Update workshop values')
		.addIntegerOption(option =>
			option.setName('cycle')
				.setDescription('Workshop cycle')
				.setRequired(false)),

	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('workshop-update')
			.setTitle('Update Cycle Values')

		const cycleInput = new TextInputBuilder()
			.setCustomId('cycleInput')
			.setLabel('Cycle')
			.setStyle(TextInputStyle.Short)
			.setMaxLength(1)
			.setRequired(true)

		const cycleInt = interaction.options.getInteger('cycle')
		if (cycleInt) {
			cycleInput.setValue(cycleInt + '')
		}

		const grooveValueInput = new TextInputBuilder()
			.setCustomId('grooveValueInput')
			.setLabel('Groove Mover Values')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(false)

		const grooveSequenceInput = new TextInputBuilder()
			.setCustomId('grooveSequenceInput')
			.setLabel('Groove Mover Sequences')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(false)

		const cowrieValueInput = new TextInputBuilder()
			.setCustomId('cowrieValueInput')
			.setLabel('Cowrie Compiler Values')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)

		const cowrieSequenceInput = new TextInputBuilder()
			.setCustomId('cowrieSequenceInput')
			.setLabel('Cowrie Compiler Sequences')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)

		const firstActionRow = new ActionRowBuilder().addComponents(cycleInput)
		const secondActionRow = new ActionRowBuilder().addComponents(grooveValueInput)
		const thirdActionRow = new ActionRowBuilder().addComponents(grooveSequenceInput)
		const fourthActionRow = new ActionRowBuilder().addComponents(cowrieValueInput)
		const fifthActionRow = new ActionRowBuilder().addComponents(cowrieSequenceInput)

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow)

		await interaction.showModal(modal)
	},
}