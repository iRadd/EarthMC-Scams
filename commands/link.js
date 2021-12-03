module.exports = {
	name: 'link',
	description: 'link your discord to your profile',
	execute(message, args) {
        const Discord = require('discord.js');
        const db = require('quick.db')
        const MCAPI = require("minecraft-lib")

        message.react('875426157686829106');

        if(!args[0]) {
            message.channel.send({ content: `> You need to mention a proper account to link your Discord Account.\n> EG: \`.link iRadioo\` or \`.link explodingmelons\``})
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
          
            let skinurl = 'https://crafatar.com/avatars/' + `${player.uuid}`
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
                console.log(`${args[0]} did not have a Valid Profile. I've created them a new Profile!`);
            }

            if (userid.get(`${player.uuid}`) == null) {
                userid.set(`${player.uuid}`, 0)
                mcuser.set(`${message.author.id}`, 0)
            }

            if(!userid.get(`${player.uuid}`) == 0) {
                message.channel.send({ content: `> **${player.username}** has already been linked to discord.\n> Think this is a mistake? Please open a ticket on the EMC Scams Discord and a Moderator will deal with the issue.`})
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                message.react('875428843454865439');
                return
            }

            if(!(db.get(`linkLimit_${message.author.id}`) == null)) {
                message.channel.send({ content: `> You are already linked to an account. You are unable to link yourself to 2+ accounts.\n> Think this is a mistake? \`.unlink\``})
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                message.react('875428843454865439');
                return
            }

            userid.set(`${player.uuid}`, message.author.id)
            mcuser.set(`${message.author.id}`, player.uuid)
            db.set(`linkLimit_${message.author.id}`, player.uuid)
            message.channel.send({ content: `> **${player.username}** has been linked to ${user}\n> You are able to unlink your account using \`.unlink\``})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return

            })
	},
};
