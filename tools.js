const { MessageEmbed } = require('discord.js');
const config = require('./config.json');

module.exports = {
	/**
	 * Regular expression for matching URLs.
	 * @see fetchImage()
	 */
	urlregex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/i,

	/**
	 * Creates an embed template.
	 * @param {string} title The title of the embed.
	 * @returns {MessageEmbed} The created embed.
	 */
	embed(title) {
		return new MessageEmbed()
			.setTitle(title)
			.setColor(0x2F3136);
	},

	/**
	 * Sends an error message.
	 * @param {Message} message The command message that created this error.
	 * @param {*} error The error message.
	 */
	error(message, error) {
		const embed = this.embed('Error').setDescription(error);
		message.channel.send(embed);
	},

	/**
	 * Gets the formatted time until the specified timestamp.
	 * @param {number} timestamp ms since 1970
	 * @returns {string} The formatted time.
	 */
	timer(timestamp) {
		const timeLeft = timestamp - Date.now();
		const days = Math.floor(timeLeft / 86400000);
		const hours = Math.floor(timeLeft / 3600000) - (days * 24);
		const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
		const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);

		string = '';
		if (days) string += `${days}d `;
		if (hours) string += `${hours}h `;
		if (minutes) string += `${minutes}min `;
		if (seconds) string += `${seconds}sec`;

		if (!string) string = `${timeLeft}ms`;
		return string;
	},

	/**
	 * Updates the client's status.
	 * @param {Client} client The client to update.
	 */
	setStatus(client) {
		const guildCount = client.guilds.cache.size;
		client.user.setActivity(`for ${config.prefix}help in ${guildCount} guilds`, { type: 'WATCHING' });
	},

	/**
	 * Fetches an image from the message or a previous message.
	 * @param {Message} message The message to fetch from.
	 * @returns {string} The URL of the found image. An error is thrown if none
	 *                   are found.
	 */
	async fetchImage(message) {
		// attached to this message
		if (message.attachments.size) return message.attachments.first().url;

		// attached to a previous message
		const messages = await message.channel.messages.fetch({ limit: 20 });
		const attmsg = messages.find(m => m.attachments.size);
		if (attmsg) return attmsg.attachments.first().url;

		// link in this or previous message
		const linkmsg = messages.find(m => this.urlregex.test(m.content));
		if (linkmsg) return linkmsg.content.match(this.urlregex)[0];
		
		throw new Error('No image found');
	},

	/**
	 * Removes role, everyone, and here mentions from a message.
	 * @param {string} string The string to remove mentions from.
	 * @returns {string} The sanitized string.
	 */
	sanitize(string) {
		return string.replace(/<@&\d+>|@everyone|@here/g, `(mention removed)`);
	}
}