const tools = require('../tools');

module.exports = {
	name: 'snipe',
	aliases: ['sn'],
	description: "Reveals the last deleted message.",
	usage: '[#channel]',
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// Get the snipe data for the channel.
		const sniped = message.client.snipeMap.get(channel.id);

		// If nothing was found, exit.
		if (!sniped) return tools.error(message, 'No message found');

		// Create an embed with the snipe data.
		const embed = tools.embed(`${sniped.author} said:`)
		.setDescription(sniped.content);

		// If the sniped message had an image, add that to the embed.
		if (sniped.attachments.size) embed.setImage(sniped.attachments.first().proxyURL);

		// Send the embed.
		return embed;
	}
}