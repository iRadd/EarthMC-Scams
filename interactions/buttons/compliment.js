module.exports = {
	id: "compliment",
	async execute(interaction) {
		await interaction.reply({
			content: "Compliment Button. SoonTM!",
		});
		return;
	},
};
