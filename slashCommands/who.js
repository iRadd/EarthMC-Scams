const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('who')
    .setDescription('Lookup a Player\'s Profile via @ or IGN')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('username')
            .setDescription("Lookup a Player's Profile via their Minecraft In Game Name")
            .addStringOption((option) =>
                option
                    .setName('username')
                    .setDescription('Enter a Player\'s Minecraft In Game Name to Lookup their Profile')
                    .setRequired(true),
            ))
    .addSubcommand((subcommand) =>
        subcommand
            .setName('user')
            .setDescription("Lookup a Player's Profile via their Discord")
            .addUserOption((option) =>
                option
                    .setName('user')
                    .setDescription('Mention a Discord User to Lookup their Profile')
                    .setRequired(true),
            ),
    ),       
    async execute(interaction) {
        // interaction.reply("what dis");
    }
}
