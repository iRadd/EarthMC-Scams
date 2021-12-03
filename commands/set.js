module.exports = {
	name: 'set',
	description: 'set a rank',
	execute(message, args) {
        const Discord = require('discord.js');
        const member = message.member; 
        const db = require('quick.db')
        const MCAPI = require("minecraft-lib")

        message.react('875426157686829106');

        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            message.channel.send({ content: `> You do not have permission to execute the following command, \`.set\``});
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('863121138947063818');
            return
        }

        if(!args[0]) {
          message.channel.send({ content: `> You need to mention a proper username to set their scam rank\n> EG: \`.set iRadioo 2\` or \`.set Fix -2\`\n\n\`4: Moderator (Admin Only)\n3: Verified Voter (Admin Only)\n2: Verified Trader (Mod & Admin Only)\n1: Channel Owner (Mod & Admin Only)\n0: Unknown/Default (Mod & Admin Only)\n-1: Suspicious (Mod & Admin Only)\n-2: Loot Killer (Mod & Admin Only)\n-3: Scammer (Mod & Admin Only)\``})
          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('863121138947063818');
          return
        }

        if(!args[1]) {
          message.channel.send({ content: `> You need to mention a proper rank number to set their scam rank\n> EG: \`.set iRadioo 2\` or \`.set Fix -2\`\n\n\`4: Moderator (Admin Only)\n3: Verified Voter (Admin Only)\n2: Verified Trader (Mod & Admin Only)\n1: Channel Owner (Mod & Admin Only)\n0: Unknown/Default (Mod & Admin Only)\n-1: Suspicious (Mod & Admin Only)\n-2: Loot Killer (Mod & Admin Only)\n-3: Scammer (Mod & Admin Only)\``})
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

          if (args[1] == 0) {
            mod.set(`${player.uuid}`, 0)
            voter.set(`${player.uuid}`, 0)
            owner.set(`${player.uuid}`, 0)
            trader.set(`${player.uuid}`, 0)

            sus.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've set ${player.username} \`${player.uuid}\` to an **Unknown** rank.`})
          }
          
          if (args[1] == 1) {

            if (owner.get(`${player.uuid}`) == 1) {
              owner.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Channel Owner** rank. I've removed it for you.\n> Was this an accident? You can do \`.set ${player.username} 1\` to give them their **Channel Owner** rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            owner.set(`${player.uuid}`, 1)
            sus.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Channel Owner** rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return

          }

          if (args[1] == 2) {

            if (trader.get(`${player.uuid}`) == 1) {
              trader.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Verified Trader** rank. I've removed the **Verified Trader** rank from them.\n> Was this an accident? You can do \`.set ${player.username} 2\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            trader.set(`${player.uuid}`, 1)
            sus.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Verified Trader** rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
          }

          if (args[1] == '-1') {

            if (sus.get(`${player.uuid}`) == 1) {
              sus.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Suspicious** rank. I've removed the **Suspicious** rank from them.\n> Was this an accident? You can do \`.set ${player.username} -1\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            sus.set(`${player.uuid}`, 1)
            scam.set(`${player.uuid}`, 0)
            mod.set(`${player.uuid}`, 0)
            voter.set(`${player.uuid}`, 0)
            owner.set(`${player.uuid}`, 0)
            trader.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Suspicious** rank.\n> This is a **__POWERFUL__** command. It removed every rank a user has and gives them the **Suspicious** Rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
          }

          if (args[1] == '-2') {

            if (loot.get(`${player.uuid}`) == 1) {
              loot.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Loot Killer** rank. I've removed the **Loot Killer** rank from them.\n> Was this an accident? You can do \`.set ${player.username} -2\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            loot.set(`${player.uuid}`, 1)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Loot Killer** rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
          }

          if (args[1] == '-3') {

            if (scam.get(`${player.uuid}`) == 1) {
              scam.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Scammer** rank. I've removed the **Scammer** rank from them.\n> Was this an accident? You can do \`.set ${player.username} -3\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            }

            scam.set(`${player.uuid}`, 1)
            sus.set(`${player.uuid}`, 0)
            mod.set(`${player.uuid}`, 0)
            voter.set(`${player.uuid}`, 0)
            owner.set(`${player.uuid}`, 0)
            trader.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Scammer** rank.\n> This is a **__POWERFUL__** command. It removed every rank a user has and gives them the **Scammer** Rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return
          }

          if (args[1] == 3) {

            if (!member.roles.cache.some(role => role.name === 'Administrator')) {
              message.channel.send({ content: `> You do not have permission to execute the following command, \`.set\``});
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
  
            }

            if (voter.get(`${player.uuid}`) == 1) {
              voter.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Verified Voter** rank. I've removed the **Verified Voter** rank from them.\n> Was this an accident? You can do \`.set ${player.username} 3\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return

            }

            voter.set(`${player.uuid}`, 1)
            sus.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)

            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Verified Voter** rank.`})
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return

          }

          if (args[1] == 4) {

            if (!member.roles.cache.some(role => role.name === 'Administrator')) {
              message.channel.send({ content: `> You do not have permission to execute the following command, \`.set\``});
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
  
            }

            if (mod.get(`${player.uuid}`) == 1) {
              mod.set(`${player.uuid}`, 0)
              message.channel.send({ content: `> ${player.username} \`${player.uuid}\` currently has the **Moderator** rank. I've removed the **Moderator** rank from them.\n> Was this an accident? You can do \`.set ${player.username} 4\` to give them their rank back.`})
              message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              message.react('875428843454865439');
              return
            
            }

            mod.set(`${player.uuid}`, 1)
            sus.set(`${player.uuid}`, 0)
            scam.set(`${player.uuid}`, 0)
            
            message.channel.send({ content: `> I've added ${player.username} \`${player.uuid}\` a **Moderator** rank.`})
            
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('875428843454865439');
            return

          }

          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          message.react('875428843454865439');

        })
	},
};
