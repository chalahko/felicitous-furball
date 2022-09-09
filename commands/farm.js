const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('farm')
		.setDescription('Show crop information')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Resource type')
				.setRequired(true)
				.setChoices(
					{ name: 'Island Corn', value: 'corn' },
					{ name: 'Island Radish', value: 'radish' },
					{ name: 'Island Wheat', value: 'wheat' },
					{ name: 'Isleberry', value: 'isleberry' },
					{ name: 'Island Onion', value: 'onion' },
					{ name: 'Island Tomato', value: 'tomato' },
					{ name: 'Island Popoto', value: 'popoto' },
					{ name: 'Island Parsnip', value: 'parsnip' },
					{ name: 'Island Pumpkin', value: 'pumpkin' },
					{ name: 'Island Cabbage', value: 'cabbage' },
				),
		),
	async execute(interaction) {
		const crop = interaction.options.getString('type')
		const cropInfo = farmData[crop]

		const farmEmbed = new EmbedBuilder()
			.setTitle(`${cropInfo.name} - Island Farm`)
			.setColor('228822')
			.addFields(
				{ name: 'Seed Acquisition Method', value: (cropInfo.gathered) ? 'Gathered' : 'Bought' },
			)
			.setThumbnail(cropInfo.icon)

		if (cropInfo.gathered) {
			farmEmbed.addFields({ name: 'Tool Required', value: cropInfo.tool })
		}

		farmEmbed.addFields({ name: 'Location', value: cropInfo.notes })

		farmEmbed.setImage(cropInfo.url)

		await interaction.reply({ embeds: [ farmEmbed ] })

		interaction.client.stats.farmsCalled = interaction.client.stats.farmsCalled + 1
	},
}

const farmData = {
	corn: { name: 'Island Corn', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Corn Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25352.png' },
	radish: { name: 'Island Radish', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Radish Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25231.png' },
	wheat: { name: 'Island Wheat', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Wheat Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25357.png' },
	isleberry: { name: 'Isleberry', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Isleberry Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25306.png' },
	onion: { name: 'Island Onion', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Onion Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25203.png' },
	tomato: { name: 'Island Tomato', gathered: false, url: 'https://i.imgur.com/8za5yrJ.jpg', notes: '*Tomato Seeds are bought from the Produce Producer once the Cropland has been fully upgraded.*', icon: 'https://www.garlandtools.org/files/icons/item/25209.png' },
	popoto: { name: 'Island Popoto', gathered: true, tool: 'Shovel', url: 'https://i.imgur.com/zm2OpJs.jpg', notes: '*Popoto Sets are gathered on the Island.*', icon: 'https://www.garlandtools.org/files/icons/item/25204.png' },
	parsnip: { name: 'Island Parsnip', gathered: true, tool: 'Shovel', url: 'https://i.imgur.com/1podXLP.jpg', notes: '*Parsnip Seeds are gathered on the Island.*', icon: 'https://www.garlandtools.org/files/icons/item/25215.png' },
	pumpkin: { name: 'Island Pumpkin', gathered: true, tool: 'None', url: 'https://i.imgur.com/uFpWReo.jpg', notes: '*Pumpkin Seeds are gathered on the Island.*', icon: 'https://www.garlandtools.org/files/icons/item/t/25232.png' },
	cabbage: { name: 'Island Cabbage', gathered: true, tool: 'None', url: 'https://i.imgur.com/I7u0QLP.jpg', notes: '*Cabbage Seeds are gathered on the Island.*', icon: 'https://www.garlandtools.org/files/icons/item/25208.png' },
}