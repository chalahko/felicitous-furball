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
		interaction.reply('test')
	},
}