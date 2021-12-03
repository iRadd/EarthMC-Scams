module.exports = {
	name: 'setcompliment',
	description: 'mod/admin command to set a user\'s compliment',
	execute(message, args) {
    const Discord = require('discord.js');
    const member = message.member; 
    const db = require('quick.db')
    const MCAPI = require("minecraft-lib")

    message.react('875426157686829106');

    if (!member.roles.cache.some(role => role.name === 'Moderator')) {
      message.channel.send({ content: `> You do not have permission to execute the following command, \`.setcompliment\``});
      message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      message.react('863121138947063818');
      return
    }

    if(!args[0]) {
      message.channel.send({ content: `> You need to mention a proper username to set their compliment number\n> EG: \`.setcompliment iRadioo 20\` or \`.setcompliment Fix 0\``})
      message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      message.react('863121138947063818');
      return
    }

  if(!args[1]) {
    message.channel.send({ content: `> You need to mention a proper number to set ${args[0]}'s Compliment Count\n> EG: \`.setcompliment iRadioo 20\` or \`.setcompliment Fix 0\``})
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

              compliments.set(`${player.uuid}`, args[1])

              message.channel.send({ content: `> I've set **${player.username}** \`${player.uuid}\`'s Compliment Count to \`${args[1]}\``})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');

          }); 
        }
      }