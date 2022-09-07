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
			.setDescription(`> Number of Servers: **${commas(guilds)}**
			> Total Bot Interactions: **${commas(interaction.client.stats.interactions)}**
			> Cycles Called: **${commas(interaction.client.stats.cyclesCalled)}**
			> Animals Called: **${commas(interaction.client.stats.animalsCalled)}**
			> FAQs Shown: **${commas(interaction.client.stats.faqsCalled)}**`)

		interaction.reply({ embeds: [ statsEmbed ] })
	},
}

function commas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}