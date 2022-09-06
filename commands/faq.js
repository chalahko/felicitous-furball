const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Frequenty asked questions'),

	async execute(interaction) {
		const faqEmbed = new EmbedBuilder()
			.setTitle('Frequently Asked Questions')
			.setColor('ff9966')
			.addFields(
				{ name: 'Why are the projected cowries so low?', value: '*The value predictions for sequences do not account for groove or workshop levels. Value adjustments are based solely on item popularity and supply levels.*' },
				{ name: 'Why are the supply predictions off?', value: '*Due to how supply changes throughout the week, fully predicting every day from the beginning is not possible. Once Day 4 supply values are acquired, all further predictions will be accurate.*' },
				{ name: 'When should I take my second rest day?', value: '*This depends highly on what is valued. Generally a good groove day can be around ~1000 and a profit day can be well over 1500. Look ahead and see if there are weak days you can skip.*' },
			)

		await interaction.reply({ embeds: [ faqEmbed ] })
	},
}