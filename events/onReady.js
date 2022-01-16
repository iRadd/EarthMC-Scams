/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 */

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {Object} client Main Application Client
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('activity', { type: 'WATCHING' }, { name: `@iRadd scam me of Better Code (SMH) | ${client.guilds.cache.size}`})

		// logs(client)
	},
};
