// const tools = require('../tools');
// const {} = require('discord.js');
// const {} = require('../config.json');

const tools = require("../tools");

module.exports = {
	name: 'unlock',
	category: 'Moderation',
	aliases: ['ul'],
	description: "Allows others to send to this channel.",
	usage: '[-v] [#channel]',
	requires: 'MANAGE_CHANNELS',
	guildOnly: true,
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// If -v was given, don't allow viewing the channel at all.
		const overwrite = (args.includes('-v') ? {VIEW_CHANNEL: true} : {SEND_MESSAGES: true})

		channel.updateOverwrite(message.guild.roles.everyone, overwrite);

		return tools.embed('Success')
		.setDescription(`Unlocked ${channel}`);
	}
}