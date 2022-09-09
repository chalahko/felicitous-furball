module.exports = {
	name: 'resources',
	async execute(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = [
			{ name: 'Island Palm Leaf', value: 'palmLeaf' },
			{ name: 'Island Apple', value: 'apple' },
			{ name: 'Island Branch', value: 'branch' },
			{ name: 'Island Stone', value: 'stone' },
			{ name: 'Island Clam', value: 'clam' },
			{ name: 'Island Laver', value: 'laver' },
			{ name: 'Island Coral', value: 'coral' },
			{ name: 'Islewort', value: 'islewort' },
			{ name: 'Island Sand', value: 'sand' },
			{ name: 'Island Log', value: 'log' },
			{ name: 'Island Palm Log', value: 'palmLog' },
			{ name: 'Island Vine', value: 'vine' },
			{ name: 'Island Sap', value: 'sap' },
			{ name: 'Island Copper Ore', value: 'copper' },
			{ name: 'Island Limestone', value: 'limestone' },
			{ name: 'Island Rock Salt', value: 'rockSalt' },
			{ name: 'Island Clay', value: 'clay' },
			{ name: 'Island Tinsand', value: 'tinsand' },
			{ name: 'Island Sugarcane', value: 'sugarcane' },
			{ name: 'Island Hemp', value: 'hemp' },
			{ name: 'Island Cotton Boll', value: 'cotton' },
			{ name: 'Islefish', value: 'islefish' },
			{ name: 'Island Jellyfish', value: 'jellyfish' },
			{ name: 'Island Squid', value: 'squid' },
			{ name: 'Island Quartz', value: 'quartz' },
			{ name: 'Island Iron Ore', value: 'iron' },
			{ name: 'Island Leucogranite', value: 'granite' },
			{ name: 'Island Silver Ore', value: 'silver' },
			{ name: 'Island Alyssum', value: 'alyssum' },
			{ name: 'Island Hammerhead', value: 'hammerhead' },
			{ name: 'Island Spruce Log', value: 'spruce' },
			{ name: 'Raw Island Garnet', value: 'garnet' },
		]

		const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.value })).slice(0, 25),
		);
	},
}