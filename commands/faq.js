const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Frequenty asked questions'),

	async execute(interaction) {
		const faqEmbed = new EmbedBuilder()
			.setTitle('Frequently Asked Questions')
			.setColor('228822')
			.addFields(
				{ name: 'How do I use this?', value: '*If you want to see information on island animals, resources, or farming, type in `/bestiary`, `/resources`, or `/farm` respectively and pick what item you\'re looking for.\n\nIf you\'re looking for the workshop calculator, simply type in `/cycle` and choose the day you want to see workshop sequences for. Choose one that best fits, based on what you have already made and what materials you have, and then set your workshop agenda up the same way!*\n\n*As a general rule of thumb, 8 total crafts will raise an item\'s supply level, devaluing further crafts. For Nonexistent items you can do up to 8 double crafts. For Insufficient: 4 double crafts. After these thresholds the supply multiplier will be baseline.*' },
				{ name: 'Why are the projected cowries so low?', value: '*The value predictions for sequences do not account for groove or workshop levels. Values are based solely on item popularity, base supply levels, and efficiency bonuses. There is still value in scoring them, even if they aren\'t accurate to ingame numbers.*' },
				{ name: 'Why are the supply predictions off?', value: '*Due to how supply changes throughout the week, fully predicting every day from the beginning is not possible. Prior to Day 4, generally only the next day can be predicted. Once Day 4 supply values are acquired, all further predictions will be accurate.*\n\n*Player influenced supply changes are also not depicted.*' },
				{ name: 'When should I take my second rest day?', value: '*This depends highly on what is valued during the current week and day. Look ahead and see if there are weak days you can skip.*' },
				{ name: 'It\'s a new day and the best sequences haven\'t changed. What gives?', value: '*Supply updates for my creator at 3AM, which means it might take a few hours to update. Sorry!*' },
			)

		await interaction.reply({ embeds: [ faqEmbed ], ephemeral: true })

		interaction.client.stats.faqsCalled = interaction.client.stats.faqsCalled + 1
	},
}