const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "meme",
		description: "Get a random meme from the internet.",
	},

	letStart: async ({ message }) => {
		try {
			const res = await axios.get("https://meme-api.com/gimme");
			const meme = res.data;

			const embed = new EmbedBuilder()
				.setTitle(meme.title)
				.setURL(meme.postLink)
				.setImage(meme.url)
				.setColor("Random")
				.setFooter({ text: `👍 ${meme.ups} | r/${meme.subreddit}` });

			message.reply({ embeds: [embed] });
		} catch (err) {
			message.reply("Failed to fetch a meme, try again later.");
		}
	},
};