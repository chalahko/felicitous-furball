const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('cycle')
		.setDescription('Display best workshop cycle crafts')
		.addIntegerOption(option =>
			option.setName('day')
				.setDescription('Cycle day')
				.setRequired(true)),

	async execute(interaction) {
		const day = interaction.options.getInteger('day')

		if (day < 1 || day > 7) {
			interaction.reply('Invalid day!')
		}
		else {
			await interaction.reply(`Getting the best sequences for Cycle ${day}`)
			interaction.client.calculator.genSequences(day)
		}
	},
}