const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	global: true,
	data: new SlashCommandBuilder()
		.setName('resources')
		.setDescription('Show resource information')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Resource type')
				.setRequired(true)
				.setAutocomplete(true),
		),
	async execute(interaction) {
		const resource = interaction.options.getString('type')

		if (!resourceData[resource]) {
			await interaction.reply({ content: `${resource} is not a resource!`, ephemeral: true })
			return
		}

		await interaction.deferReply()

		const resourceInfo = resourceData[resource]

		const resourceEmbed = new EmbedBuilder()
			.setTitle(`${resourceInfo.name} - Island Resources`)
			.setColor('228822')
			.setThumbnail(resourceInfo.icon)

		if (!resourceInfo.granary) {
			resourceEmbed.setImage(resourceInfo.url)
			resourceEmbed.addFields(
				{ name: 'Tool Required', value: resourceInfo.tool },
				{ name: 'Farming Spot', value: resourceInfo.notes },
			)
		}
		else {
			resourceEmbed.addFields(
				{ name: 'Acquisition', value: resourceInfo.notes },
			)
		}

		await interaction.editReply({ embeds: [ resourceEmbed ] })

		interaction.client.stats.resourcesCalled = interaction.client.stats.resourcesCalled + 1
	},
}

const resourceData = {
	palmLeaf: { name: 'Island Palm Leaf', tool: 'None', url: 'https://i.imgur.com/QbdXEOH.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/25026.png' },
	apple: { name: 'Island Apple', tool: 'Stone Hatchet', url: 'https://i.imgur.com/ZWF26Yn.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/25308.png' },
	branch: { name: 'Island Branch', tool: 'None', url: 'https://i.imgur.com/ZWF26Yn.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/22416.png' },
	stone: { name: 'Island Stone', tool: 'None', url: 'https://i.imgur.com/nxUISTO.jpg', notes: '*Hit some extra flora nodes as needed to respawn rocks.*', icon: 'https://www.garlandtools.org/files/icons/item/21451.png' },
	clam: { name: 'Island Clam', tool: 'None', url: 'https://i.imgur.com/mbEYcWw.jpg', notes: '*Alternate between the two sections, hitting all nodes.*', icon: 'https://www.garlandtools.org/files/icons/item/29031.png' },
	laver: { name: 'Island Laver', tool: 'None', url: 'https://i.imgur.com/44thZFN.jpg', notes: '*Choose either underwater area.*', icon: 'https://www.garlandtools.org/files/icons/item/25225.png' },
	coral: { name: 'Island Coral', tool: 'None', url: 'https://i.imgur.com/pYS91kf.jpg', notes: '*Do a big loop, hitting all coral and laver nodes.*', icon: 'https://www.garlandtools.org/files/icons/item/29060.png' },
	islewort: { name: 'Islewort', tool: 'None', url: 'https://i.imgur.com/k5rCmcE.jpg', notes: '*Islewort comes from Cotton Boll and Hemp nodes. Choose your favorite one to gather.*', icon: 'https://www.garlandtools.org/files/icons/item/25010.png' },
	sand: { name: 'Island Sand', tool: 'None', url: 'https://i.imgur.com/YXvKJ5p.jpg', notes: '*Hit some extra flora nodes as needed to respawn dirt piles.*', icon: 'https://www.garlandtools.org/files/icons/item/21464.png' },
	log: { name: 'Island Log', tool: 'Stone Hatchet', url: 'https://i.imgur.com/ZWF26Yn.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/22407.png' },
	palmLog: { name: 'Island Palm Log', tool: 'Stone Hatchet', url: 'https://i.imgur.com/QbdXEOH.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/22410.png' },
	vine: { name: 'Island Vine', tool: 'None', url: 'https://i.imgur.com/UqSdomt.jpg', notes: '*Alternate across the river hitting all the sugarcane.*', icon: 'https://www.garlandtools.org/files/icons/item/21672.png' },
	sap: { name: 'Island Sap', tool: 'None', url: 'https://i.imgur.com/ZWF26Yn.jpg', notes: '*Alternate sides of the river, hitting extra nodes as needed to respawn trees.*', icon: 'https://www.garlandtools.org/files/icons/item/22642.png' },

	copper: { name: 'Island Copper Ore', tool: 'Stone Hammer', url: 'https://i.imgur.com/u8HUIsQ.jpg', notes: '*Copper is spread far apart, hit extra rock nodes to respawn the copper.*', icon: 'https://www.garlandtools.org/files/icons/item/21209.png' },
	limestone: { name: 'Island Limestone', tool: 'Stone Hammer', url: 'https://i.imgur.com/nxUISTO.jpg', notes: '*Hit some extra flora nodes as needed to respawn rocks.*', icon: 'https://www.garlandtools.org/files/icons/item/22615.png' },
	rockSalt: { name: 'Island Rock Salt', tool: 'Stone Hammer', url: 'https://i.imgur.com/vEH7AlR.jpg', notes: '*Hit all the rock salt and then queue up for Battle Hall (Gold Saucer section). Leave the instance immediately. Repeat.*', icon: 'https://www.garlandtools.org/files/icons/item/22617.png' },

	clay: { name: 'Island Clay', tool: 'Shovel', url: 'https://i.imgur.com/YXvKJ5p.jpg', notes: '*Hit some extra flora nodes as needed to respawn dirt piles.*', icon: 'https://www.garlandtools.org/files/icons/item/22634.png' },
	tinsand: { name: 'Island Tinsand', tool: 'Shovel', url: 'https://i.imgur.com/8b4lDob.jpg', notes: '*Run up the river getting all the tinsand, hit some nodes to respawn them, then repeat.*', icon: 'https://www.garlandtools.org/files/icons/item/21204.png' },

	sugarcane: { name: 'Island Sugarcane', tool: 'Copper Scythe', url: 'https://i.imgur.com/UqSdomt.jpg', notes: '*Alternate across the river hitting all the sugarcane.*', icon: 'https://www.garlandtools.org/files/icons/item/22452.png' },
	hemp: { name: 'Island Hemp', tool: 'Copper Scythe', url: 'https://i.imgur.com/k5rCmcE.jpg', notes: '*Do a large loop through the trees near the beach, hitting everything.*', icon: 'https://www.garlandtools.org/files/icons/item/25213.png' },
	cotton: { name: 'Island Cotton Boll', tool: 'Copper Scythe', url: 'https://i.imgur.com/FHasUZY.jpg', notes: '*Grab the cotton boll nodes, then hit some extra things until they respawn.*', icon: 'https://www.garlandtools.org/files/icons/item/21652.png' },

	islefish: { name: 'Islefish', tool: 'Bronze Gig', url: 'https://i.imgur.com/mbEYcWw.jpg', notes: '*Alternate between the two sections, hitting all laver and clam nodes.*' },
	jellyfish: { name: 'Island Jellyfish', tool: 'Bronze Gig', url: 'https://i.imgur.com/pYS91kf.jpg', notes: '*Do a big loop, hitting all coral and laver nodes.*', icon: 'https://www.garlandtools.org/files/icons/item/29657.png' },
	squid: { name: 'Island Squid', tool: 'Bronze Gig', url: 'https://i.imgur.com/44thZFN.jpg', notes: '*Choose either underwater area.*', icon: 'https://www.garlandtools.org/files/icons/item/29177.png' },

	quartz: { name: 'Island Quartz', tool: 'Bronze Beakaxe', url: 'https://i.imgur.com/nxBMBaU.jpg', notes: '*The summit is the ideal place, but if you\'re not rank 10, simply follow the Iron Ore loop.*', icon: 'https://www.garlandtools.org/files/icons/item/20019.png' },
	iron: { name: 'Island Iron Ore', tool: 'Bronze Beakaxe', url: 'https://i.imgur.com/IppOcPH.jpg', notes: '*Mine the top nodes, jump down, hit those and then run to the three nodes on the ledge. Repeat.*', icon: 'https://www.garlandtools.org/files/icons/item/21202.png' },
	granite: { name: 'Island Leucogranite', tool: 'Bronze Beakaxe', url: 'https://i.imgur.com/QqftTuJ.jpg', notes: '*Run along the northern coast, hitting all the nodes. Run back to the start and repeat.*', icon: 'https://www.garlandtools.org/files/icons/item/21251.png' },

	silver: { name: 'Island Silver Ore', granary: true, notes: 'This is a rare resource gathered from the Granary.', icon: 'https://www.garlandtools.org/files/icons/item/21211.png' },
	alyssum: { name: 'Island Alyssum', granary: true, notes: 'This is a rare resource gathered from the Granary.', icon: 'https://www.garlandtools.org/files/icons/item/22627.png' },
	hammerhead: { name: 'Island Hammerhead', granary: true, notes: 'This is a rare resource gathered from the Granary.', icon: 'https://www.garlandtools.org/files/icons/item/29026.png' },
	spruce: { name: 'Island Spruce Log', granary: true, notes: 'This is a rare resource gathered from the Granary.', icon: 'https://www.garlandtools.org/files/icons/item/22413.png' },
	garnet: { name: 'Raw Island Garnet', granary: true, notes: 'This is a rare resource gathered from the Granary.', icon: 'https://www.garlandtools.org/files/icons/item/21456.png' },
}