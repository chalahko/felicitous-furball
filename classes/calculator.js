const fs = require('node:fs')

class Calculator {
	constructor() {
		this._items = { }
		this._daySequences = [ ]

		items.forEach(e => {
			this._items[e[0]] = { pop: 0, value: [], baseValue: e[1], combo: e[2], peakCycle: 0, peakType: 0, time: e[3] }
		})
	}

	updatePattern(pattern) {
		pattern.forEach(e => {
			this._items[e.item].peakCycle = e.cycle
			this._items[e.item].peakType = e.peakType
		})

		this.updateValues()
	}

	updatePopularity(pop) {
		pop.forEach(e => {
			this._items[e.item].pop = e.pop
		})

		this.updateValues()
	}

	// Update item values for each day based on supply/popularity
	updateValues() {
		for (const key in this._items) {
			const item = this._items[key]

			for (let day = 1; day < 8; day++) {
				let peakMultiplier = 0

				if (day == item.peakCycle) {
					peakMultiplier = item.peakType
				}
				else if (day == item.peakCycle - 1) {
					peakMultiplier = 1
				}
				else {
					peakMultiplier = 0
				}

				item.value[day - 1] = Math.floor(item.baseValue * (1 + (0.3 * peakMultiplier)) * (1 + (0.2 * item.pop)))
			}
		}
	}

	// Determine the final day predicted
	getLastPeak() {
		let lastPeak = 0
		for (const key in this._items) {
			const peak = this._items[key].peakCycle

			if (peak > lastPeak) lastPeak = peak
		}

		return lastPeak
	}

	// Generate sequences for all days and write them
	calculateSequences() {
		const daySequences = []

		for (let i = 0; i < 7; i++) {
			daySequences.push(this.genSequences(i))
		}

		this.setDaySequences(daySequences)
		fs.writeFileSync('./data/day-sequences.json', JSON.stringify(daySequences))

		console.table(this._items)
	}

	setDaySequences(sequences) {
		this._daySequences = sequences
	}

	getDaySequences() {
		return this._daySequences
	}

	getSingleDaySequences(day) {
		return this.getDaySequences().find(item => item.day === day)
	}

	// Generate sequences and values for given day
	genSequences(day) {
		const sequences = []

		for (const key in this._items) {
			const item = this._items[key]
			if (item.time > 4) continue

			this.recur(item, [ key ], 24, sequences)
		}

		const outputSequences = sequences.map(el => {
			let value = 0

			for (let i = 0; i < el.length; i++) {

				if (i == 0) {
					value = value + this._items[el[i]].value[day]
				}
				else {
					value = value + this._items[el[i]].value[day] * 2
				}
			}

			return { value: value, sequence: el }
		}).sort((a, b) => b.value - a.value)

		/* Debug Prints
		console.table(outputSequences.filter(this.filterSixSequences).sort((a, b) => b.value - a.value).slice(0, 10))

		console.table(outputSequences.slice(0, 25))
		console.table(this._items)*/

		const dayValues = {
			day: day + 1,
			groovers: this.getGrooveSequences(outputSequences),
			top: outputSequences.slice(0, 16),
		}

		return dayValues
	}

	// Recursion to generate sequences
	recur(item, sequence, time, output) {
		if (time - item.time == 0) {
			output.push(sequence)
			return
		}
		else if (time - item.time < 0) {
			return
		}

		for (let i = 0; i < item.combo.length; i++) {
			const nextItem = this._items[item.combo[i]]

			this.recur(nextItem, [...sequence, item.combo[i]], time - item.time, output)
		}
	}

	// Get 6 item sequences optimal for increasing groove
	getGrooveSequences(sequences) {
		const sixSequences = sequences.filter(seq => seq.sequence.length == 6)
			.sort((a, b) => b.value - a.value)
			.map(el => {
				const count = {}

				el.sequence.forEach((item, i) => {
					if (i == 0) {
						count[item] = (count[item] || 0) + 1
					}
					else {
						count[item] = (count[item] || 0) + 2
					}
				})

				const mainItem = Object.values(count).indexOf(6)
				if (mainItem > -1) {
					return { value: el.value, sequence: el.sequence, mainItem: Object.keys(count)[mainItem] }
				}
				else {
					return { value: el.value, sequence: el.sequence, mainItem: undefined }
				}
			})

		// Here we try to remove sequences that are similar in items and value
		const uniqueSequences = []
		let i = 0
		while (uniqueSequences.length < 8) {
			if (!uniqueSequences.find(el => el.mainItem == sixSequences[i].mainItem) && !uniqueSequences.find(el => el.value == sixSequences[i].value)) {
				uniqueSequences.push(sixSequences[i])
			}
			else {
				i++
				continue
			}
		}

		return uniqueSequences
	}
}

module.exports = {
	Calculator,
}

/*
/ Workshop Items
/ name, baseValue, combo, time
*/
const items = [
	[ 'Potion', 33, [ 'Firesand', 'Growth Formula', 'Essential Draught', 'Vegetable Juice' ], 4 ],
	[ 'Firesand', 33, [ 'Potion', 'Growth Formula', 'Essential Draught', 'Vegetable Juice', 'Brick Counter', 'Garnet Rapier', 'Quartz Ring', 'Porcelain Vase' ], 4 ],
	[ 'Wooden Chair', 50, [ 'Brick Counter', 'Bronze Sheep', 'Sheepfluff Rug', 'Bed', 'Brush', 'Necklace', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ], 6 ],
	[ 'Grilled Clam', 33, [ 'Baked Pumpkin', 'Boiled Egg', 'Parsnip Salad', 'Onion Soup', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ], 4 ],
	[ 'Necklace', 33, [ 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Brush', 'Wooden Chair', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ], 4 ],
	[ 'Coral Ring', 50, [ 'Necklace', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Grilled Clam', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ], 6 ],
	[ 'Barbut', 50, [ 'Tunic', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Scale Fingers', 'Bronze Sheep', 'Silver Ear Cuffs', 'Iron Axe', 'Garden Scythe' ], 6 ],
	[ 'Macuahuitl', 50, [ 'Hora', 'Garnet Rapier', 'Iron Axe', 'Crook', 'Brush', 'Necklace', 'Wooden Chair', 'Spruce Round Shield' ], 6 ],
	[ 'Sauerkraut', 48, [ 'Salt Cod', 'Corn Flakes', 'Pickled Radish' ], 4 ],
	[ 'Baked Pumpkin', 48, [ 'Grilled Clam', 'Boiled Egg', 'Parsnip Salad', 'Onion Soup' ], 4 ],
	[ 'Tunic', 86, [ 'Barbut', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Scale Fingers', 'Ribbon', 'Rope', 'Bed' ], 6 ],
	[ 'Culinary Knife', 52, [ 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Sheepfluff Rug' ], 4 ],
	[ 'Brush', 52, [ 'Culinary Knife', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Wooden Chair', 'Necklace', 'Macuahuitl', 'Spruce Round Shield', 'Crook' ], 4 ],
	[ 'Boiled Egg', 52, [ 'Baked Pumpkin', 'Grilled Clam', 'Parsnip Salad', 'Onion Soup', 'Culinary Knife', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ], 4 ],
	[ 'Hora', 86, [ 'Macuahuitl', 'Garnet Rapier', 'Iron Axe', 'Crook', 'Culinary Knife', 'Scale Fingers', 'Boiled Egg', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ], 6 ],
	[ 'Earrings', 52, [ 'Necklace', 'Coral Ring', 'Silver Ear Cuffs', 'Ribbon', 'Quartz Ring', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Culinary Knife', 'Butter', 'Sheepfluff Rug' ], 4 ],
	[ 'Butter', 52, [ 'Squid Ink', 'Isleberry Jam', 'Tomato Relish', 'Culinary Knife', 'Scale Fingers', 'Hora', 'Earrings', 'Boiled Egg', 'Horn', 'Sheepfluff Rug' ], 4 ],
	[ 'Brick Counter', 57, [ 'Wooden Chair', 'Bronze Sheep', 'Sheepfluff Rug', 'Bed', 'Porcelain Vase', 'Garnet Rapier', 'Quartz Ring', 'Firesand' ], 6 ],
	[ 'Bronze Sheep', 76, [ 'Wooden Chair', 'Brick Counter', 'Sheepfluff Rug', 'Bed', 'Garden Scythe', 'Silver Ear Cuffs', 'Iron Axe', 'Barbut' ], 8 ],
	[ 'Growth Formula', 163, [ 'Firesand', 'Potion', 'Essential Draught', 'Vegetable Juice' ], 8 ],
	[ 'Garnet Rapier', 163, [ 'Macuahuitl', 'Hora', 'Iron Axe', 'Crook', 'Brick Counter', 'Firesand', 'Quartz Ring', 'Porcelain Vase' ], 8 ],
	[ 'Spruce Round Shield', 163, [ 'Barbut', 'Tunic', 'Cavalier\'s Hat', 'Scale Fingers', 'Wooden Chair', 'Necklace', 'Macuahuitl', 'Brush', 'Crook' ], 8 ],
	[ 'Shark Oil', 163, [ 'Culinary Knife', 'Brush', 'Rope', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Coral Ring', 'Grilled Clam', 'Essential Draught', 'Squid Ink', 'Islefish Pie', 'Salt Cod' ], 8 ],
	[ 'Silver Ear Cuffs', 163, [ 'Necklace', 'Coral Ring', 'Earrings', 'Ribbon', 'Quartz Ring', 'Bronze Sheep', 'Barbut', 'Iron Axe', 'Garden Scythe' ], 8 ],
	[ 'Sweet Popoto', 86, [ 'Caramels', 'Islefish Pie', 'Pumpkin Pudding' ], 6 ],
	[ 'Parsnip Salad', 57, [ 'Baked Pumpkin', 'Grilled Clam', 'Boiled Egg', 'Onion Soup' ], 4 ],
	[ 'Caramels', 97, [ 'Sweet Popoto', 'Islefish Pie', 'Pumpkin Pudding' ], 6 ],
	[ 'Ribbon', 64, [ 'Necklace', 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Quartz Ring', 'Tunic', 'Rope', 'Bed', 'Cavalier\'s Hat' ], 6 ],
	[ 'Rope', 43, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Horn', 'Porcelain Vase', 'Garden Scythe', 'Tunic', 'Bed', 'Ribbon', 'Cavalier\'s Hat' ], 4 ],
	[ 'Cavalier\'s Hat', 97, [ 'Barbut', 'Tunic', 'Spruce Round Shield', 'Scale Fingers', 'Ribbon', 'Rope', 'Bed' ], 6 ],
	[ 'Horn', 97, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Porcelain Vase', 'Garden Scythe', 'Boiled Egg', 'Scale Fingers', 'Hora', 'Earrings', 'Butter', 'Sheepfluff Rug' ], 6 ],
	[ 'Salt Cod', 64, [ 'Sauerkraut', 'Corn Flakes', 'Pickled Radish', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Squid Ink', 'Islefish Pie' ], 6 ],
	[ 'Squid Ink', 43, [ 'Butter', 'Isleberry Jam', 'Tomato Relish', 'Coral Ring', 'Shark Oil', 'Essential Draught', 'Grilled Clam', 'Islefish Pie', 'Salt Cod' ], 4 ],
	[ 'Essential Draught', 64, [ 'Firesand', 'Potion', 'Growth Formula', 'Vegetable Juice', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Salt Cod', 'Squid Ink', 'Islefish Pie' ], 6 ],
	[ 'Isleberry Jam', 93, [ 'Squid Ink', 'Butter', 'Tomato Relish' ], 6 ],
	[ 'Tomato Relish', 62, [ 'Squid Ink', 'Butter', 'Isleberry Jam' ], 4 ],
	[ 'Onion Soup', 93, [ 'Baked Pumpkin', 'Grilled Clam', 'Boiled Egg', 'Parsnip Salad' ], 6 ],
	[ 'Islefish Pie', 93, [ 'Sweet Popoto', 'Caramels', 'Pumpkin Pudding', 'Grilled Clam', 'Coral Ring', 'Shark Oil', 'Salt Cod', 'Squid Ink', 'Essential Draught' ], 6 ],
	[ 'Corn Flakes', 62, [ 'Sauerkraut', 'Salt Cod', 'Pickled Radish' ], 4 ],
	[ 'Pickled Radish', 124, [ 'Salt Cod', 'Corn Flakes', 'Sauerkraut' ], 8 ],
	[ 'Iron Axe', 86, [ 'Macuahuitl', 'Hora', 'Garnet Rapier', 'Crook', 'Garden Scythe', 'Silver Ear Cuffs', 'Bronze Sheep', 'Barbut' ], 8 ],
	[ 'Quartz Ring', 86, [ 'Necklace', 'Coral Ring', 'Earrings', 'Silver Ear Cuffs', 'Ribbon', 'Brick Counter', 'Garnet Rapier', 'Firesand', 'Porcelain Vase' ], 8 ],
	[ 'Porcelain Vase', 86, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Garden Scythe', 'Brick Counter', 'Garnet Rapier', 'Quartz Ring', 'Firesand' ], 8 ],
	[ 'Vegetable Juice', 93, [ 'Firesand', 'Potion', 'Essential Draught', 'Growth Formula' ], 6 ],
	[ 'Pumpkin Pudding', 93, [ 'Sweet Popoto', 'Caramels', 'Islefish Pie' ], 6 ],
	[ 'Sheepfluff Rug', 108, [ 'Wooden Chair', 'Brick Counter', 'Bronze Sheep', 'Bed', 'Culinary Knife', 'Boiled Egg', 'Hora', 'Earrings', 'Butter', 'Horn', 'Scale Fingers' ], 6 ],
	[ 'Garden Scythe', 108, [ 'Culinary Knife', 'Brush', 'Shark Oil', 'Rope', 'Horn', 'Porcelain Vase', 'Bronze Sheep', 'Silver Ear Cuffs', 'Iron Axe', 'Barbut' ], 6 ],
	[ 'Bed', 144, [ 'Wooden Chair', 'Brick Counter', 'Bronze Sheep', 'Sheepfluff Rug', 'Tunic', 'Ribbon', 'Rope', 'Cavalier\'s Hat' ], 8 ],
	[ 'Scale Fingers', 144, [ 'Barbut', 'Tunic', 'Spruce Round Shield', 'Cavalier\'s Hat', 'Culinary Knife', 'Boiled Egg', 'Hora', 'Earrings', 'Butter', 'Horn', 'Sheepfluff Rug' ], 8 ],
	[ 'Crook', 144, [ 'Hora', 'Garnet Rapier', 'Iron Axe', 'Macuahuitl', 'Brush', 'Necklace', 'Wooden Chair', 'Spruce Round Shield' ], 8 ],
]