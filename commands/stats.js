const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: false,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Show bot statistics'),

	async execute(interaction) {
		const guilds = interaction.client.guilds.cache.size

		const statsEmbed = new EmbedBuilder()
			.setAuthor({ name: 'Felicitous Furball Stats', iconURL: 'https://i.imgur.com/KxZwtlU.png' })
			.setColor('ee3300')
			.addFields(
				{ name: 'Number of Servers', value: `**${guilds}**` },
				{ name: 'Total Bot Interactions', value: `**${interaction.client.stats.interactions}**` },
				{ name: 'Cycles Called', value: `**${interaction.client.stats.cyclesCalled}**` },
				{ name: 'FAQs Shown', value: `**${interaction.client.stats.faqsCalled}**` },
			)

		interaction.reply({ embeds: [ statsEmbed ] })
	},
}