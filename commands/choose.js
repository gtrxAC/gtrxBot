const tools = require('../tools');
// const {} = require('discord.js');
// const {} = require('../config.json');

module.exports = {
	name: 'choose',
	aliases: ['ch'],
	description: "Chooses one of the given options randomly",
	usage: '<choice1> <choice2> [...]',
	minArgs: 2,
	async run(message, args) {
		// Choose a random choice from the arguments.
		const choice = args[Math.floor(Math.random() * args.length)];

		// Send an embed with the choice.
		return tools.embed(null)
		.setDescription(`**Choices: ${args.length}\n**Result:** ${choice}`);
	}
}