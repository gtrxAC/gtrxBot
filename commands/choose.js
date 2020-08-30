const tools = require('../tools');

module.exports = {
	name: 'choose',
	category: 'Utility',
	aliases: ['ch'],
	description: "Chooses one of the given options.",
	usage: '<choice1> <choice2> [...]',
	minArgs: 2,
	async run(message, args) {
		// Choose a random choice from the arguments.
		const choice = args[Math.floor(Math.random() * args.length)];

		// Send an embed with the choice.
		return tools.embed('Random Choice')
		.setDescription(`**Choices:** ${args.length}\n**Result:** ${choice}`);
	}
}