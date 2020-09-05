const tools = require('../tools');

module.exports = {
	name: 'lock',
	category: 'Moderation',
	aliases: ['lk'],
	description: "Locks others from sending to this channel.",
	usage: '[-v] [#channel]',
	requires: 'MANAGE_CHANNELS',
	guildOnly: true,
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// If -v was given, don't allow viewing the channel at all.
		const overwrite = (args.includes('-v') ? {VIEW_CHANNEL: false} : {SEND_MESSAGES: false})

		// Update the channel's permissions.
		channel.updateOverwrite(message.guild.roles.everyone, overwrite);

		// Send a confirmation message.
		return tools.embed('Success')
		.setDescription(`Locked ${channel}`);
	}
}