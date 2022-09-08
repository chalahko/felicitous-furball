module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} triggered an interaction.`)

		interaction.client.stats.interactions = interaction.client.stats.interactions + 1
		interaction.client.saveStats()

		if (interaction.isModalSubmit()) {
			const modal = interaction.client.modals.get(interaction.customId)

			if (!modal) return

			try {
				await modal.execute(interaction)
			}
			catch (error) {
				console.error(error)
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
			}
		}
		else if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName)

			if (!command) return

			try {
				await command.execute(interaction)
			}
			catch (error) {
				console.error(error)
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
			}
		}
		else if (interaction.isAutocomplete()) {

			if (interaction.commandName === 'bestiary') {
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
			}
		}
	},
}