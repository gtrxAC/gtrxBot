// const tools = require('../tools');
// const {} = require('discord.js');
// const {} = require('../config.json');

const tools = require("../tools");

module.exports = {
	name: 'lock',
	category: 'Moderation',
	aliases: ['lk'],
	description: "Locks others from sending to the channel.",
	usage: '[-v] [#channel]',
	requires: 'MANAGE_CHANNELS',
	guildOnly: true,
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// If -v was given, don't allow viewing the channel at all.
		const overwrite = (args.includes('-v') ? {VIEW_CHANNEL: false} : {SEND_MESSAGES: false})

		channel.updateOverwrite(message.guild.roles.everyone, overwrite);

		return tools.embed('Success')
		.setDescription(`Locked ${channel}`);
	}
}