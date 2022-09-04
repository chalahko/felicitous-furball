const { Collection } = require('discord.js')

class Calculator {
	constructor() {
		this._items = { }

		items.forEach(e => {
			this._items[e[0]] = { pop: undefined, supply: [], shift: [], value: [], baseValue: e[1], combo: e[2], peakCycle: 0, typeStrong: false }
		})
	}

	updatePattern(pattern) {
		pattern.forEach(e => {
			this._items[e.item].peakCycle = e.cycle
			this._items[e.item].typeStrong = e.typeStrong
		})

		console.table(this._items)
	}

	updatePopularity(pop) {
		pop.forEach(e => {
			this._items[e.item].pop = e.pop
		})

		console.table(this._items)
	}
}

module.exports = {
	Calculator,
}

const items = [
	[ 'Potion', 33, [ 'Firesand', 'Growth Formula', 'Essential Draught', 'Vegetable Juice' ]],
	[ 'Firesand', 33, [ 'Potion', 'Growth Formula', 'Essential Draught', 'Vegetable Juice', 'Brick Counter', 'Garnet Rapier', 'Quartz Ring', 'Porcelain Vase' ] ],
	[ 'Wooden Chair', 50, [ 'Brick Counter', 'Bronze Sheep', 'Sheepfluff Rug', 'Bed', 'Brush', 'Necklace', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ] ],
	[ 'Grilled Clam', 33, [ 'Baked Pumpkin', 'Boiled Egg', 'Parsnip Salad', 'Onion Soup', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ] ],
	[ 'Necklace', 33, [ 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Brush', 'Wooden Chair', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ] ],
	[ 'Coral Ring', 50, [ 'Necklace', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Grilled Clam', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ] ],
	[ 'Barbut', 50, [ 'Tunic', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Scale Fingers', 'Bronze Sheep', 'Silver Ear Cuffs', 'Iron Axe', 'Garden Scythe' ] ],
	[ 'Macuahuitl', 50, [ 'Hora', 'Garnet Rapier', 'Iron Axe', 'Crook', 'Brush', 'Necklace', 'Wooden Chair', 'Spruce Round Shield' ] ],
	[ 'Sauerkraut', 48, [ 'Salt Cod', 'Corn Flakes', 'Pickled Radish' ] ],
	[ 'Baked Pumpkin', 48, [ 'Grilled Clam', 'Boiled Egg', 'Parsnip Salad', 'Onion Soup' ] ],
	[ 'Tunic', 86, [ 'Barbut', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Scale Fingers', 'Ribbon', 'Rope', 'Bed' ] ],
	[ 'Culinary Knife', 52, [ 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Sheepfluff Rug' ] ],
	[ 'Brush', 52, [ 'Culinary Knife', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Wooden Chair', 'Necklace', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ] ],
	[ 'Boiled Egg', 52, [ 'Baked Pumpkin', 'Grilled Clam', 'Parsnip Salad', 'Onion Soup', 'Culinary Knife', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ] ],
	[ 'Hora', 86, [ 'Macuahuitl', 'Garnet Rapier', 'Iron Axe', 'Crook', 'Culinary Knife', 'Scale Fingers', 'Boiled Egg', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ] ],
	[ 'Earrings', 52, [ 'Necklace', 'Coral Ring', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Culinary Knife', 'Butter', 'Sheepfluff Rug' ] ],
	[ 'Butter', 52, [ 'Squid Ink', 'Isleberry Jam', 'Tomato Relish', 'Culinary Knife', 'Scale Fingers', 'Hora', 'Earrings', 'Boiled Egg', 'Horn', 'Sheepfluff Rug' ] ],
	[ 'Brick Counter', 57, [ 'Wooden Chair', 'Bronze Sheep', 'Sheepfluff Rug', 'Bed', 'Porcelain Vase', 'Garnet Rapier', 'Quartz Ring', 'Firesand' ] ],
	[ 'Bronze Sheep', 76, [ 'Wooden Chair', 'Brick Counter', 'Sheepfluff Rug', 'Bed', 'Garden Scythe', 'Silver Ear Cuffs', 'Iron Axe', 'Barbut' ] ],
	[ 'Growth Formula', 163, [ 'Firesand', 'Potion', 'Essential Draught', 'Vegetable Juice' ] ],
	[ 'Garnet Rapier', 163, [ 'Macuahuitl', 'Hora', 'Iron Axe', 'Crook', 'Brick Counter', 'Firesand', 'Quartz Ring', 'Porcelain Vase' ] ],
	[ 'Spruce Round Shield', 163, [ 'Barbut', 'Tunic', 'Cavalier\'s Hat', 'Scale Fingers', 'Wooden Chair', 'Necklace', 'Macuahuitl', 'Brush', 'Crook' ] ],
	[ 'Shark Oil', 163, [ 'Culinary Knife', 'Brush', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Coral Ring', 'Grilled Clam', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ] ],
	[ 'Silver Ear Cuffs', 163, [ 'Necklace', 'Coral Ring', 'Earrings', 'Ribbon', 'Quartz Ring', 'Bronze Sheep', 'Barbut', 'Iron Axe', 'Garden Scythe' ] ],
	[ 'Sweet Popoto', 86, [ 'Caramels', 'Islefish Pie', 'Pumpkin Pudding' ] ],
	[ 'Parsnip Salad', 57, [ 'Baked Pumpkin', 'Grilled Clam', 'Boiled Egg', 'Onion Soup' ] ],
	[ 'Caramels', 97, [ 'Sweet Popoto', 'Islefish Pie', 'Pumpkin Pudding' ] ],
	[ 'Ribbon', 64, [ 'Necklace', 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Quartz Ring', 'Tunic', 'Rope', 'Bed', 'Cavalier\'s Hat' ] ],
	[ 'Rope', 43, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Tunic', 'Bed', 'Ribbon', 'Cavalier\'s Hat' ] ],
	[ 'Cavalier\'s Hat', 97, [ 'Barbut', 'Tunic', 'Spruce Round Shield', 'Scale Fingers', 'Ribbon', 'Rope', 'Bed' ] ],
	[ 'Horn', 97, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Porcelain Vase', 'Garden Scythe', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Sheepfluff Rug' ] ],
	[ 'Salt Cod', 64, [ 'Sauerkraut', 'Corn Flakes', 'Pickled Radish', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie' ] ],
	[ 'Squid Ink', 43, [ 'Butter', 'Isleberry Jam', 'Tomato Relish', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Grilled Clam', 'Islefish Pie', 'Salt Cod' ] ],
	[ 'Essential Draught', 64, [ 'Firesand', 'Potion', 'Growth Formula', 'Vegetable Juice', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Salt Cod', 'Squid Ink', 'Islefish Pie' ] ],
	[ 'Isleberry Jam', 93, [ 'Squid Ink', 'Butter', 'Tomato Relish' ] ],
	[ 'Tomato Relish', 62, [ 'Squid Ink', 'Butter', 'Isleberry Jam' ] ],
	[ 'Onion Soup', 93, [ 'Baked Pumpkin', 'Grilled Clam', 'Boiled Egg', 'Parsnip Salad' ] ],
	[ 'Islefish Pie', 93, [ 'Sweet Popoto', 'Caramels', 'Pumpkin Pudding', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Salt Cod', 'Squid Ink', 'Essential Draught' ] ],
	[ 'Corn Flakes', 62, [ 'Sauerkraut', 'Salt Cod', 'Pickled Radish' ] ],
	[ 'Pickled Radish', 124, [ 'Salt Cod', 'Corn Flakes', 'Sauerkraut' ] ],
	[ 'Iron Axe', 86, [ 'Macuahuitl', 'Hora', 'Garnet Rapier', 'Crook', 'Garden Scythe', 'Silver Ear Cuffs', 'Bronze Sheep', 'Barbut' ] ],
	[ 'Quartz Ring', 86, [ 'Necklace', 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Brick Counter', 'Garnet Rapier', 'Firesand', 'Porcelain Vase' ] ],
	[ 'Porcelain Vase', 86, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Garden Scythe', 'Brick Counter', 'Garnet Rapier', 'Quartz Ring', 'Firesand' ] ],
	[ 'Vegetable Juice', 93, [ 'Firesand', 'Potion', 'Essential Draught', 'Growth Formula' ] ],
	[ 'Pumpkin Pudding', 93, [ 'Sweet Popoto', 'Caramels', 'Islefish Pie' ] ],
	[ 'Sheepfluff Rug', 108, [ 'Wooden Chair', 'Brick Counter', 'Bronze Sheep', 'Bed', 'Culinary Knife', 'Boiled Egg', 'Hora', 'Earrings', 'Butter', 'Horn', 'Scale Fingers' ] ],
	[ 'Garden Scythe', 108, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Bronze Sheep', 'Silver Ear Cuffs', 'Iron Axe', 'Barbut' ] ],
	[ 'Bed', 144, [ 'Wooden Chair', 'Brick Counter', 'Bronze Sheep', 'Sheepfluff Rug', 'Tunic', 'Ribbon', 'Rope', 'Cavalier\'s Hat' ] ],
	[ 'Scale Fingers', 144, [ 'Barbut', 'Tunic', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Culinary Knife', 'Boiled Egg', 'Hora', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ] ],
	[ 'Crook', 144, [ 'Hora', 'Garnet Rapier', 'Iron Axe', 'Macuahuitl', 'Brush', 'Necklace', 'Wooden Chair', 'Spruce Round Shield' ] ],
]