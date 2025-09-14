const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "ping",
		description: "Check bot latency.",
	},

	letStart: async ({ message, client }) => {
		const ping = Date.now() - message.createdTimestamp;

		const embed = new EmbedBuilder()
			.setTitle("🏓 Pong!")
			.setDescription(`Latency: **${ping}ms**\nAPI Latency: **${client.ws.ping}ms**`)
			.setColor("Green");

		message.reply({ embeds: [embed] });
	},
};