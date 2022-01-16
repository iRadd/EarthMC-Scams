module.exports = {
	name: "interactionCreate",
	execute: async (interaction) => {
		const { client } = interaction;

		if (!interaction.isContextMenu()) return;
		
		if (interaction.targetType === "USER") {

			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}
		
		else if (interaction.targetType === "MESSAGE") {
			
			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}

		else {
			return console.log(
				"Something weird happening in context menu. Received a context menu of unknown type."
			);
		}
	},
};
