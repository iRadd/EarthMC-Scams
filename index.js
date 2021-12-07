const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING
	] 
});

client.commands = new Collection();

const logs = require('./logs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

const slashCommands = [];

client.slashCommands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of slashCommandFiles) {
	const slashCommand = require(`./slashCommands/${file}`);
	slashCommands.push(slashCommand.data.toJSON());
	client.slashCommands.set(slashCommand.data.name, slashCommand);
}

client.once('ready', () => {
	console.log('Ready!');

	client.user.setActivity('activity', { type: 'WATCHING' }, { name: `@iRadd scam me of Better Code (SMH) | ${client.guilds.cache.size}`})

	// logs(client)
});

client.on('messageCreate', async message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	if (message.channel.id !== '917222773380755456') return;

	try {
	 	client.commands.get(command).execute(message, args);
	 } catch (error) {
	 	console.error(error);
	 	message.channel.send({ content: `> There was an error when executing this command\n> If this contiunes to happen, join the [Support Server](https://discord.gg/P3r5n6TDEN)`});
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
