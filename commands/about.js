const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Information about the Furball'),

	async execute(interaction) {
		const aboutEmbed = new EmbedBuilder()
			.setTitle('About')
			.setColor('ee3300')
			.addFields(
				{ name: 'Creator', value: '*Kiru Zhwan of Mateus*' },
				{ name: 'Github', value: '[felicitous-furball](https://github.com/jakeahend/felicitous-furball \'felicitous-furball\')' },
				{ name: 'Credits', value: `**Clorifex**, **Rogueadyn**, and **Kikugumo** - for weather prediction code and island weather states

				**hexyll** - for the animal filter used to verify my code

				**vflower** - for the amazing [Supply Pattern Calculator](https://docs.google.com/spreadsheets/d/1llk21R5jOq8pKtjVbCYJaGuvIFvpQacfwxCXIKY08vU 'Supply Pattern Calculator')

				**LeitonGrey** - for their [Island Sanctuary Guide](https://docs.google.com/spreadsheets/d/1R4UKA2zZ1MZ7sRUEBAi2Eh0NCVPbb1iQh8BjoQ_vVX4/htmlview?pru=AAABg0OWiUY*-cNeUjuLyEewM4DV_O2Z0w# 'Island Sanctuary Guide') used to verify my sequence predictions

				**Garland Tools** - for the item icons

				A special thanks to everyone in the Poking Paradise server and the FFXIV Subreddit who contributed research and animal locations/times.` },
			)

		await interaction.reply({ embeds: [ aboutEmbed ], ephemeral: true })
	},
}