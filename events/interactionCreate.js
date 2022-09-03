module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`)

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
	},
}