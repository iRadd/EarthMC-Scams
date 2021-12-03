module.exports = {
	name: 'help',
	description: 'a general help command',
	execute(message, args) {
    const Discord = require('discord.js');
    const db = require('quick.db')
    const MCAPI = require("minecraft-lib")

    message.react('875426157686829106');

    style = '#bcbcbc'
 
        const embed = new Discord.MessageEmbed()
        .setColor(style)
        .setTitle(`About the Bot`)
        .setDescription(`Heyo! I'm the Scamming Expert 🧐\nInnovating the way both old and new players be aware of potential scams is my job!\nUse my prefix \`.\` to execute commands from the following list!\nIf you encounter an error, join the [Support Server](https://discord.gg/VWu4vKtEfW)`)
        .addField('General Commands', `\`.help\` General List of the Commands`, false)
        .addField('Profile Commands', `\`.who <name>\` Lookup Each Player's Profil\n\`.compliment <name>\` Compliment about a Specify Player\n\`.complain <name>\` Complain about a Specify Player\n\`.link <name>\` Link Your Discord Account to Your Profile (Max: 1)\n\`.unlink\` Unlink Your Discord Account to Your Profile\n\`.vote <name>\` Apply for the Verified Trader`, false)
        .addField('Moderator Commands', '\`.discord <add/edit/delete> <name>\` Add, Edit, or Delete Linked Profiles\n\`.set <name> <rank>\` Set a Specify User\'s Rank\n\`.setcompliment\` Set a User\'s Compliment Count\n\`.setcomplain\` Set a User\'s Complaint Count', false)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: false }))

        message.channel.send({ embeds: [embed] })

          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('875428843454865439');
	},
};