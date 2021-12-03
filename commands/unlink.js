module.exports = {
	name: 'unlink',
	description: 'unlink your discord from your profile',
	execute(message, args) {
        const Discord = require('discord.js');
        const db = require('quick.db')
        const MCAPI = require("minecraft-lib")
        const mcdata = require("mcdata")

        var mcuser = new db.table('mcuser')

        message.react('875426157686829106');

        if (db.get(`linkLimit_${message.author.id}`) == null) {
            message.channel.send({ content: `> You are not linked to an account yet.\n> Use the command \`.link <in game name>\` to link yourself to your account.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
        }

        MCAPI.players.get_from_uuid(`${db.get(`linkLimit_${message.author.id}`)}`)
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

	      	if (userid.get(`${player.uuid}`) == null) {
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
            
            userid.set(`${player.uuid}`, 0)
            db.delete(`linkLimit_${message.author.id}`)
            message.channel.send({ content: `> You have unlinked your Discord Account from **${player.username}**\n> You are able to relink your account using \`.link <in game name>\``})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
        })
    }
}
