const snoowrap = require('snoowrap');
const tools = require('../tools');

if (!process.env.REDDIT_USER_AGENT) {
	const e = new Error(`Environment variables not set, see README for details.`);
	throw e;
}

const reddit = new snoowrap({
	userAgent: process.env.REDDIT_USER_AGENT,
	clientId: process.env.REDDIT_CLIENT_ID,
	clientSecret: process.env.REDDIT_CLIENT_SECRET,
	username: process.env.REDDIT_USERNAME,
	password: process.env.REDDIT_PASSWORD
});

module.exports = {
	name: 'reddit',
	category: 'Fun',
	aliases: ['r'],
	description: "Gets a random post from a subreddit.",
	usage: '<subreddit>',
	minArgs: 1,
	cooldown: 4000,
	async run(_, [subreddit]) {
		// Get the hot posts from the subreddit.
		const posts = await reddit.getSubreddit(subreddit).getHot()

		// Ignore meta-posts.
		.filter(post => !post.stickied);
		
		// Choose a random post.
		const post = posts[Math.floor(Math.random() * posts.length)];
		if (!post) throw new Error('Invalid subreddit');

		// Send an embed with the post's data.
		return tools.embed(post.title)
			.setAuthor(`u/${post.author.name}`)
			.setURL(`https://reddit.com${post.permalink}`)
			.setImage(post.url);
	}
}