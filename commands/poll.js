const tools = require('../tools');
const emotes = [
	'🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲',
	'🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']

module.exports = {
	name: 'poll',
	category: 'Utility',
	aliases: ['po', 'vote'],
	description: "Creates a reaction poll.",
	usage: '<question> ; <choice1> ; <choice2> ; [...]',
	minArgs: 1,
	async run(message, args) {
		// Split the arguments by commas.
		args = args.join(' ').split(';');
		const title = args.shift();

		if (!args.length)
			throw new Error("No choices specified (try separating by semicolons)");

		if (args.length < 2)
			throw new Error("Only one choice specified");

		if (args.length > emotes.length)
			throw new Error(`Too many choices, ${args.length} > ${emotes.length}`);

		let desc = '';
		args.forEach((choice, i) => {
			desc += `${emotes[i]}  ${choice.trim()}\n`;
		})

		const embed = tools.embed(title)
			.setDescription(desc)
			.setAuthor(message.author.username, message.author.avatarURL());

		if (message.deletable) message.delete();
		const reply = await message.channel.send(embed);

		for (let i = 0; i < args.length; i++)
			await reply.react(emotes[i]);
	}
}