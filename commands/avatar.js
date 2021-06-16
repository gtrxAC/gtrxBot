module.exports = {
	name: 'avatar',
	category: 'Image',
	aliases: ['av', 'pfp'],
	description: "Gets your or another user's avatar.",
	usage: '[user]',
	async run(message, args) {
		let fail;

		const target = (args.length ?
			message.mentions.members.first()
			|| message.guild.members.cache.find(m => m.user.id === args[0]
			|| m.user.tag.startsWith(args.join(' '))
			|| m.displayName.startsWith(args.join(' ')))
			|| (fail = true, message.member)
			: message.member);

		if (fail) message.channel.send("Failed to get avatar, try using their @mention.");
		return target.user.avatarURL({ format: 'png', dynamic: true });
	}
}