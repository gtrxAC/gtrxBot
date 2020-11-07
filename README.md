# gtrxBot3

the 3rd iteration of nobody's favorite discord utility bot

[Invite Link](https://discord.com/oauth2/authorize?client_id=568738663572176916&permissions=8&scope=bot)



## Command List
The prefix is `gb`, for example `gbpurge` or `gbpu` to purge.


### Fun
* `reddit <subreddit>`
Gets a random hot post from the specified subreddit.


### Utility
* `calc <expression>`
Calculates a mathematical expression.

* `choose <choice1>, <choice2>, [...]`
Chooses one of the given choices randomly. The options must be separated by commas.

* `editsnipe [#channel]` / `esn`
Reveals the last edited message in the specified or current channel.

* `embed <title> ; [description] ; [footer] ; [image url]` / `emb`
Creates an embed message. The image can also be specified through an attachment.

* `random <min> <max>` / `rnd`
Generates a random number with the specified lower and upper range.

* `sayas <user> <message ...>`
Says a message as a look-alike (webhook) of another user.

* `snipe [#channel]` / `sn`
Reveals the last deleted message in the specified or current channel. This can also snipe images and embeds.


### Image
* `avatar [@user]` / `av`
Gets your or the specified user's avatar.

* `scale <width> <height> [noSmoothing] [image url]` / `sc`
Resizes the specified image.


### Moderation
* `ban <user> [reason] [deletedays]` / `b`
Bans a user from the server.

* `kick <user> [reason]` / `k`
Kicks a user from the server.

* `lock [-v] [#channel]` / `lk`
Locks others from sending messages to the channel. If -v is specified, this locks others from seeing the channel at all.

* `purge <amount>` / `pu`
Deletes the specified amount of messages.

* `unlock [-v] [#channel]` / `ul`
Allows others to send messages to this channel. If -v is specified, this allows others to view the channel.


### Information
* `help [command]` / `?`
Shows the command list or info on a command.

* `invite` / `support` / `inv`
Sends you the invite link for the bot.

* `ping` / `pi`
Checks the bot's latency to Discord.


### Owner Only
* `eval <code ...>` / `ev`
Runs JavaScript code. 



## Self-hosting
1. Clone the repository.
2. Install the dependencies. `npm i discord.js snoowrap canvas`
* `snoowrap` is used for the `reddit` command.
* `canvas` is used for some image commands.
3. Create a token.txt file and paste your bot token there. [Get a token here](https://discord.com/developers)
4. Change the owner ID in config.json to your user ID. [How to get your ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
5. If you want to use the `reddit` command, create a reddit-auth.json file and paste your credientials: [Get credientials here](https://www.reddit.com/prefs/apps)
```json
{
	"userAgent": "nodejs:yourbotname:v1.0 (by /u/yourusername)",
	"clientId": "your client id",
	"clientSecret": "your client secret",
	"username": "yourusername",
	"password": "password123"
}
```
6. Run the bot. `node index.js`