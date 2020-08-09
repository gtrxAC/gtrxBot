const tools = require('../tools');
const {owners} = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['?'],
	description: "Shows the command list or command info.",
	usage: '[command]',
	async run(message, [commandName]) {
		if (commandName) {
			// If a command was specified, find the command's info.
			const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			// If no command was found, exit.
			if (!command) return tools.error(message, 'Invalid command');

			// Format the command's info into an embed.
			const embed = tools.embed(`${command.name} command`)
			let desc = '';
			if (command.aliases) desc += `**Aliases:** ${command.aliases.join(', ')}\n`;
			if (command.description) desc += `**Description:** ${command.description}\n`;
			if (command.usage) desc += `**Usage:** ${command.usage}\n`;
			if (command.requires) desc += `**Requires:** ${command.requires}\n\n`;
			if (command.guildOnly) desc += `This command is guild only.\n`;
			if (command.ownerOnly) desc += `This command is owner only.`;

			// Send the embed.
			return embed.setDescription(desc);
		} else {
			// If no command was specified, show every command in a list.
			const embed = tools.embed(`Command List`);
			let desc = '';

			// Add each command to the list, ignoring owner only commands.
			message.client.commands.array().forEach(command => {
				if (command.ownerOnly && !owners.includes(message.author.id)) return;
				desc += `**${command.name}:** ${command.description}\n`;
			})

			// Send the embed.
			return embed.setDescription(desc);
		}
	}
}