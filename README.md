# gtrxBot

Simple and open-source utility bot with useful commands like snipe and sayas.

[Invite Link](https://discord.com/oauth2/authorize?client_id=568738663572176916&permissions=8&scope=bot)



## Command List
The prefix is `gb`, for example `gbpurge` or `gbpu` to purge. All commands can be written in 5 or less characters with abbreviations.


### Fun
* `reddit/r <subreddit>`<br>
Gets a random hot post from the specified subreddit.


### Utility
* `calc/c/math <expression>`<br>
Calculates a mathematical expression. [Supported operators](https://gist.github.com/gtrxAC/b51c63edaae85955c6327fadfd359b95)

* `choose/ch <choice1>, <choice2>, [...]`<br>
Chooses one of the given choices randomly. The options must be separated by commas.

* `editsnipe/esn/es [#channel]`<br>
Reveals the last edited message in the specified or current channel. Edited messages are stored until the bot restarts.

* `embed/emb <title> ; [description] ; [footer] ; [image url]`<br>
Creates an embed message. The image can also be specified through an attachment. [Examples](https://cdn.discordapp.com/attachments/558927357893935106/872579167852593232/unknown.png)

* `poll/po/vote <question> ; <choice1> ; <choice2> ...`<br>
Creates a reaction poll. Supports up to 26 choices separated by semicolons.

* `random/rnd <min> <max>`<br>
Generates a random number with the specified lower and upper range.

* `sayas/sa <user> <message ...>`<br>
Says a message as a look-alike (webhook) of another user.

* `snipe/sn [#channel]`<br>
Reveals the last deleted message in the specified or current channel. This can also snipe images and embeds. Deleted messages are stored until the bot restarts.


### Image
* `avatar/av [@user]`<br>
Gets your or the specified user's avatar.

* `scale/sc <width> <height> [noSmoothing] [image url]`<br>
Resizes the specified image. If noSmoothing is specified, the image will use nearest-neighbor scaling, making the result look pixelated instead of blurred.


### Moderation
* `ban/b <user> [reason] [deletedays]`<br>
Bans a user from the server. If the last word of the reason is a number, that many days of messages are deleted.

* `kick/k <user> [reason]`<br>
Kicks a user from the server.

* `lock/lk/unlock/ul [-v] [#channel]`<br>
Locks others from sending messages to the specified channel. If no channel is specified, the current channel is used. If -v is specified, this hides the channel entirely. If the channel is already locked/hidden, this command will unlock/show it.

* `purge/pu/delete <amount>`<br>
Deletes the specified amount of messages.


### Information
* `help/? [command]`<br>
Shows the command list or info on a command.

* `invite/support/inv`<br>
Sends you the invite link for the bot.

* `ping/pi [-t]`<br>
Checks the bot's latency to Discord. If -t is specified, the bot will run a short test of sending, editing, reacting and deleting messages and time it.


### Owner Only
* `eval/ev <code ...>`<br>
Runs JavaScript code. 



## Self-hosting
1. Clone the repository.
2. Install the dependencies. `npm i discord.js snoowrap canvas`
* `snoowrap` is used for the `reddit` command.
* `canvas` is used for some image commands.
3. Set the `TOKEN` environment variable to your bot token. [Create a bot account here](https://discord.com/developers)
* You can use a `start.sh` shell script or the `dotenv` module to set up environment variables.
4. Change the owner ID in config.json to your user ID. [How to get your ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
5. If you want to use the `reddit` command, create a [Reddit API](https://www.reddit.com/prefs/apps) application and set the following environment variables:
* `REDDIT_USER_AGENT`
* `REDDIT_CLIENT_ID`
* `REDDIT_CLIENT_SECRET`
* `REDDIT_USERNAME`
* `REDDIT_PASSWORD`
7. Run the bot. `node index.js`
