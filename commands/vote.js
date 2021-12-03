module.exports = {
	name: 'vote',
	description: 'non VT\'s can vote via this command.',
	execute(message, args) {
    const Discord = require('discord.js');
    const db = require('quick.db')
    const MCAPI = require("minecraft-lib")

    message.react('875426157686829106');

    if(!args[0]) {
      message.channel.send({ content: `> You need to mention a proper username to apply for the Verified Trader rank.\n> EG: \`.vote iRadioo\` or \`.vote explodingmelons\``})
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
            console.log(`${args[0]} did not have a Valid Profile. I've created them a new Profile!`);
          }

          style = "#bcbcbc"
          title = "Unknown"

          if (owner.get(`${player.uuid}`) == 1) {
            style = "#e67e22"
          } 

          if (trader.get(`${player.uuid}`) == 1) {
              message.channel.send({ content: `> You are already a **Verified Trader**\n> This command is for Unknown, Suspicious, and Scammers to attempt to get the Verified Trader rank.\n> If you are looking to apply for **Verified Voter**, check the Market Holdings discord for more information.` })
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('863121138947063818');
              return;
            }
          
          if (userid.get(`${player.uuid}`) == 0) {
            notlinked = `<@${message.author.id}>`
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
        
        	const check = db.get(`voteCheck_${message.author.id}`)
            const playerCheck = db.get(`voteCheck_${player.uuid}`)
            const timeout = 172800000;

            if(check !== null && timeout - (Date.now() - check) > 0) {
              const ms = require("pretty-ms")
              const timeLeft = ms(timeout - (Date.now() - check))
              message.channel.send({ content: `> You've already applied for **Verified Trader**! You can re-apply in \`${timeLeft}\``});
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }
        
        if(playerCheck !== null && timeout - (Date.now() - check) > 0) {
              const ms = require("pretty-ms")
              const timeLeft = ms(timeout - (Date.now() - check))
              message.channel.send({ content: `> You've already applied for **Verified Trader**! You can re-apply in \`${timeLeft}\``});
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

        const channel = message.guild.channels.cache.find(c => c.name === 'verification-voting');
        if(!channel) return message.channel.send({ content: `Can't find the Voting Channel in the Configuration`});
          
        message.channel.send({ content: `> I've set a Vote for your Verified Trader Rank.\n> Check again between 12-48 hours for your result.`})
        db.set(`voteCheck_${message.author.id}`, Date.now())
        db.set(`voteCheck_${player.uuid}`, Date.now())

        const embed = new Discord.MessageEmbed()
        .setColor(style)
        .setTitle(`${player.username}`)
        .setThumbnail(skinurl)
        .addField('UUID', `${player.uuid}`, false)
        .addField('NameMC Profile', `[${player.username}'s NameMC Profile](https://namemc.com/profile/${player.uuid})`, false)
        .addField('Compliment Count', `${compliments.get(`${player.uuid}`)}`, false)
        .addField('Complaint Count', `${complaints.get(`${player.uuid}`)}`, false)  
        .addField('Linked Discord', notlinked.toString() + ` - ${message.author.tag}`, false)
        .setFooter(`Submitted by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: false }))

        channel.send({ embeds: [embed] }).then((msg) =>{
            msg.react('✅');
            msg.react('❎');
        }).catch((err)=>{
            throw err;
        });

          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('875428843454865439');

        })
	},
};