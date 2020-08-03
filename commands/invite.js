const tools = require('../tools');

module.exports = {
	name: 'invite',
	aliases: ['support', 'inv'],
	description: "Add gtrxBot to your server or join the support server",
	async run(message, args) {
		return tools.embed('Links')
		.setDescription(
			`[Add me to your server](https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot)\n`+
			`[Join the meme cave™](https://discord.gg/vRzh7wr)\n`+
			`[Join support server](https://discord.gg/bRTPbpg)\n`+
			`[View source code](https://github.com/gtrxAC/gtrxBot3)`
		)
	}
}