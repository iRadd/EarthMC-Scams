module.exports = {
	name: 'who',
	description: 'each user\'s profile.',
	execute(message, args) {
    const Discord = require('discord.js');
    const { MessageActionRow, MessageButton } = require('discord.js');
    const db = require('quick.db')
    const MCAPI = require("minecraft-lib")

    message.react('875426157686829106');

    if(!args[0]) {
      message.channel.send({ content: `> You need to mention a proper username to view their account.\n> EG: \`.who iRadioo\` or \`.who explodingmelons\``})
      message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      message.react('863121138947063818');
      return
    }
 	
    MCAPI.players.get(`${args[0]}`)
	  .catch(error => {
        message.channel.send({ content: `> That is not a valid username, if this is a mistake, please contact \`iRadd#7003\``})
        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        message.react('875428843454865439');
        return
      })
      .then(player => {

        if (player == undefined) {
          message.channel.send({ content: `> That is not a valid username, if this is a mistake, please contact \`iRadd#7003\``})
          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('875428843454865439');
          return
        }

        let skinurl = 'https://crafatar.com/avatars/' + `${player.uuid}` + '?overlay'
        let user = message.author;

        var compliments = new db.table('compliments')
        var complaints = new db.table('complaints')

        var mod = new db.table('mod')
        var voter = new db.table('voter')
        var owner = new db.table('owner')
        var trader = new db.table('trader')
        
        var sus = new db.table('sus')
        var loot = new db.table('loot')
        var scam = new db.table('scam')

        var userid = new db.table('userid')
        var mcuser = new db.table('mcuser')

	      	if (compliments.get(`${player.uuid}`) == null) {
            compliments.set(`${player.uuid}`, 0)
            complaints.set(`${player.uuid}`, 0)
            mod.set(`${player.uuid}`, 0)
            voter.set(`${player.uuid}`, 0)
            owner.set(`${player.uuid}`, 0)
            trader.set(`${player.uuid}`, 0)
            sus.set(`${player.uuid}`, 0)
            loot.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)
            userid.set(`${player.uuid}`, 0)
            mcuser.set(`${message.author.id}`, 0)
            console.log(`${args[0]} did not have a Valid Profile. I've created them a new Profile!`);
          }

          style = "#bcbcbc"

          if (owner.get(`${player.uuid}`) == 1) {
            d = "<:ChannelOwnerBadge:875102842585763870> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
            style = "#e67e22"
          } else {
            d = ''
          }

          if (trader.get(`${player.uuid}`) == 1) {
            c = "<:VerifiedTraderBadge:875177140050616320> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
            title = 'Verified Trader'
            style = "#9b59b6"
          } else {
            c = ''
            title = 'Unknown'
          }

          if (voter.get(`${player.uuid}`) == 1) {
            b = "<:VoterBadge:875102967848648767> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
            style = "#f962f1"
          } else {
            b = ''
          }

          if (mod.get(`${player.uuid}`) == 1) {
            a = "<:ModBadge:875095723572600843> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
            style = "#31985f"
          } else {
            a = ''
          }

          if (userid.get(`${player.uuid}`) == 0) {
            notlinked = `${player.username} isn't Linked` + '\n' + `\`.link ${player.username}\``
          } else {
            notlinked = `<@${userid.get(`${player.uuid}`)}>`
          }

          if (sus.get(`${player.uuid}`) == 1) {
            title = 'Suspicious'
            style = '#e37c25'
          }

          if (loot.get(`${player.uuid}`) == 1) {
            title = 'Loot Killer'
            style = '#e74c3c'
          }
          
          if (scam.get(`${player.uuid}`) == 1) {
            title = 'Scammer'
            style = '#df4b3b'
          }

          if (player.uuid == 'fb5a54e7e611499fb7502228a3623c1b') {
            a = "<:redsus:892501320957825124> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
          }
          if (player.uuid == 'e56841be9fa84d529491d62cb21a011f') {
              a = "<:iRaddTheCat:914326693861269544> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍' + "<:ModBadge:875095723572600843> " + '‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍'
          }

          const embed = new Discord.MessageEmbed()
          .setAuthor(`${player.username}`)
          .setTitle(title.toString())
          .setThumbnail(skinurl)
          .setDescription(a.toString() + b.toString() + c.toString() + d.toString())  
          .addField('Compliments', `${compliments.get(`${player.uuid}`)}`, false)
          .addField('Complaints', `${complaints.get(`${player.uuid}`)}`, false)  
          .addField('Linked Discord', `${notlinked.toString()}`, false)  
          .setColor(`${style}`)
          .setTimestamp()

          const complimentComplainRow = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`compliment_${player.uuid}`)
              .setLabel('Compliment')
              .setStyle('SUCCESS')
              .setDisabled(true),
            new MessageButton()
              .setCustomId(`complain_${player.uuid}`)
              .setLabel('Complain')
              .setStyle('DANGER')
              .setDisabled(true)
          );
        
          message.channel.send({ content: `${user}, here is **${player.username}'s Profile**!`, embeds: [embed], components: [complimentComplainRow] });
          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('875428843454865439');

        })
	},
};