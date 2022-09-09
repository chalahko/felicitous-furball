module.exports = {
	name: 'bestiary',
	async execute(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = [
			{ name: 'Lost Lamb', value: 'lamb' },
			{ name: 'Ornery Karakul', value: 'karakul' },
			{ name: 'Opo-Opo', value: 'opo' },
			{ name: 'Lemur', value: 'lemur' },
			{ name: 'Apkallu', value: 'apkallu' },
			{ name: 'Apkallu of Paradise', value: 'apkalluParadise' },
			{ name: 'Ground Squirrel', value: 'squirrel' },
			{ name: 'Star Marmot', value: 'marmot' },
			{ name: 'Beachcomb', value: 'beachcomb' },
			{ name: 'Coblyn', value: 'coblyn' },
			{ name: 'Yellow Coblyn', value: 'coblynYellow' },
			{ name: 'Twinklefleece', value: 'twinklefleece' },
			{ name: 'Wild Dodo', value: 'dodo' },
			{ name: 'Dodo of Paradise', value: 'dodoParadise' },
			{ name: 'Island Doe', value: 'doe' },
			{ name: 'Island Stag', value: 'stag' },
			{ name: 'Paissa', value: 'paissa' },
			{ name: 'Chocobo', value: 'chocobo' },
			{ name: 'Black Chocobo', value: 'chocoboBlack' },
			{ name: 'Glyptodon Pup', value: 'glyptodonPup' },
			{ name: 'Glyptodon', value: 'glyptodon' },
			{ name: 'Aurochs', value: 'aurochs' },
			{ name: 'Grand Buffalo', value: 'buffalo' },
			{ name: 'Island Nanny', value: 'nanny' },
			{ name: 'Island Billy', value: 'billy' },
			{ name: 'Goobbue', value: 'goobbue' },
			{ name: 'Alligator', value: 'alligator' },
			{ name: 'Blue Back', value: 'back' },
			{ name: 'Gold Back', value: 'backGold' },
		]

		const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.value })).slice(0, 25),
		);
	},
}