const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "grok",
		description: "Ask Grok AI something.",
		usage: "grok <question>",
	},

	letStart: async ({ message, args }) => {
		const query = args.join(" ");
		if (!query) return message.reply("❌ Please provide a question.");

		try {
			const url = `https://rapido.zetsu.xyz/api/grok?query=${encodeURIComponent(query)}`;
			const res = await axios.get(url);

			if (!res.data.status) return message.reply("⚠️ Failed to get a response from Grok.");

			const embed = new EmbedBuilder()
				.setTitle("🤖 Grok AI")
				.addFields(
					{ name: "You asked", value: query },
					{ name: "Response", value: res.data.response }
				)
				.setFooter({ text: `Operator: ${res.data.operator}` })
				.setColor("Purple");

			message.reply({ embeds: [embed] });
		} catch (e) {
			message.reply("❌ Error fetching Grok response.");
		}
	},
};