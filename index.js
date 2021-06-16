// Load the required modules.
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const tools = require('./tools');
const client = new Client();
const cooldowns = new Collection();

client.commands = new Collection();
client.snipeMap = new Map();
client.editSnipeMap = new Map();

// Load the command files from ./commands/
fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
		cooldowns.set(command.name, new Collection());
	})

// Message handler, see https://discordjs.guide/command-handling/
client.on('message', async message => {
	// Ignore bot and non-command messages.
	const { prefix } = config;
	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;

	// Separate the message content into the command and arguments.
	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Exit if no command was found.
	if (!command) return;

	const {
		name,
		usage,
		cooldown = 2000,
		minArgs = 0,
		ownerOnly,
		guildOnly,
		requires,
		run
	} = command;

	// If the user is on cooldown, exit.
	const timestamps = cooldowns.get(name);

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldown;

		if (Date.now() < expirationTime) {
			const timeLeft = tools.timer(expirationTime);
			return tools.error(message, `This command is in cooldown for ${timeLeft}`);
		}
	}

	// If the command's requirements aren't met, exit.
	if (args.length < minArgs)
		return tools.error(message, `${name} requires at least ${minArgs} args: \`${usage}\``);

	if (ownerOnly && !config.owners.includes(message.author.id))
		return tools.error(message, `${name} is set to owner only`);

	if (guildOnly && !['text', 'news'].includes(message.channel.type))
		return tools.error(message, `${name} is set to guild only`);

	if (requires && !message.member.permissions.has(requires))
		return tools.error(message, `${name} requires the ${command.requires} permission`);

	// Run the command.
	try {
		const result = await run(message, args);
		
		// The command's return value is sent. If it's false, nothing is sent.
		if (result) message.channel.send(result);
		
		timestamps.set(message.author.id, Date.now());
		setTimeout(() => timestamps.delete(message.author.id), cooldown);
	} catch (e) {
		// If the command throws an error, send the error message and don't
		// apply a cooldown.
		tools.error(message, e.message);
	}
})

// Save deleted messages so the snipe command can reveal them.
.on('messageDelete', message => {
	client.snipeMap.set(message.channel.id, {
		author: message.author.tag,
		content: message.content,
		ts: message.createdTimestamp,
		attachment: message.attachments.first(),
		embed: message.embeds[0]
	})
})

// Save edited messages so the editsnipe command can reveal them.
.on('messageUpdate', (oldMessage, newMessage) => {
	client.editSnipeMap.set(newMessage.channel.id, {
		author: newMessage.author.tag,
		oldContent: oldMessage.content,
		newContent: newMessage.content
	})
})

// If the amount of accessible guilds changes, update the status.
.on('guildCreate', () => tools.setStatus(client))
.on('guildDelete', () => tools.setStatus(client))

// When the bot logs in, set its status.
.on('ready', () => {
	tools.setStatus(client);
	console.log('ready!');
})

// Make sure the token is set.
if (!process.env.TOKEN) {
	const e = new Error(`Environment variables not set, see README for details.`);
	throw e;
}

client.login(process.env.TOKEN);