module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		const { client } = interaction;

		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId);

		if (!command) {
			await require("../messages/defaultButtonError").execute(interaction);
			return;
		}
		
		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that button!",
				ephemeral: true,
			});
			return;
		}
	},
};
