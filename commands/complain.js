module.exports = {
	name: 'complain',
	description: 'complain about another user',
	execute(message, args) {
    const Discord = require('discord.js');
    const member = message.member; 
    let user = message.author;
    const db = require('quick.db')
    const MCAPI = require("minecraft-lib")

    message.react('875426157686829106');

    if(!args[0]) {
      message.channel.send({ content: `> You need to mention a proper username to complain\n> EG: \`.complain Fix\` or \`.complain EarthMC\``})
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

            if (complaints.get(`${player.uuid}`) == null) {
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

            const usercomplaint = db.get(`${player.uuid}_complaint_${message.author.id}`)
            const check = db.get(`complainCheck_${message.author.id}`)
            var timeout = 300000;
            if (member.roles.cache.has('/*verified trader id here so its more secure*/')) {
            	var timeout = 60000;
            } else {
                var timeout = 300000;
            }

            if(usercomplaint === 1) {
              db.delete(`${player.uuid}_complaint_${message.author.id}`)
              complaints.set(`${player.uuid}`, (complaints.get(`${player.uuid}`) - 1))
              message.channel.send({ content: `> You've already complained **${player.username}**\n> Your previous complaint for **${player.username}** has been removed.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            if(check !== null && timeout - (Date.now() - check) > 0) {
              const ms = require("pretty-ms")
              const timeLeft = ms(timeout - (Date.now() - check))
              message.channel.send({ content: `> You've complained someone recently.\n> There is a cooldown to complain users.\n> Try \`.complain\` again in \`${timeLeft}\``});
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }
        
        	if (member.roles.cache.has('/*verified trader id here so its more secure*/')) {
                if(usercomplaint === null) {
                  complaints.set(`${player.uuid}`, (complaints.get(`${player.uuid}`) + 1))
                  db.set(`${player.uuid}_complaint_${message.author.id}`, 1)
                  message.channel.send({ content: `> You've complained **${player.username}**\n> You are able to complain another person in one minute.`})
                  db.set(`complainCheck_${message.author.id}`, Date.now())
                  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                  message.react('875428843454865439');
                  return
            	}
            } else {
                if(usercomplaint === null) {
                  complaints.set(`${player.uuid}`, (complaints.get(`${player.uuid}`) + 1))
                  db.set(`${player.uuid}_complaint_${message.author.id}`, 1)
                  message.channel.send({ content: `> You've complained **${player.username}**\n> You are able to complain another person in five minutes.`})
                  db.set(`complainCheck_${message.author.id}`, Date.now())
                  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                  message.react('875428843454865439');
                  return
            	}
            }

        }); 
      }
    }
