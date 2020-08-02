# gtrxBot3

the 3rd iteration of nobody's favorite discord utility bot

[Invite Link](https://discord.com/oauth2/authorize?client_id=568738663572176916&permissions=8&scope=bot)

## Command List
The prefix is `gb`, for example `gbpurge` or `gbpu` to purge.

* `choose <choice1> <choice2> [...]`
Chooses one of the given choices randomly.

* `editsnipe [#channel]` / `esn`
Reveals the last edited message in the specified or current channel.

* `embed <title> ; [description] ; [footer] ; [image url]` / `emb`
Creates an embed message. The image can also be specified through an attachment.

* `eval <code ...>` / `ev` *Bot owner only*
Runs JavaScript code. 

* `help [command]` / `?`
Shows the command list or info on a command.

* `invite` / `support` / `inv`
Sends you the invite link for the bot.

* `ping` / `pi`
Checks the bot's latency to Discord.

* `purge <amount>` / `pu`
Deletes the specified amount of messages.

* `random <min> <max>` / `rnd`
Generates a random number with the specified lower and upper range.

* `sayas <user> <message ...>`
Says a message as a look-alike (webhook) of another user.

* `snipe [#channel]` / `sn`
Reveals the last deleted message in the specified or current channel. This can also snipe images in messages.

## Self-hosting
1. Clone the repository.
2. Install the dependencies. `npm i discord.js`
3. Create a token.txt file in the root directory.
4. Paste your bot token in the token.txt file. [Get a token here](https://discord.com/developers)
5. Change the owner ID in config.json to your user ID. [How to get your ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
6. Run the bot. `node index.js`
