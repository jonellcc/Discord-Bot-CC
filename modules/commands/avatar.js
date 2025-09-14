const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "avatar",
		description: "Show your avatar or another user's avatar.",
	},

	letStart: async ({ message }) => {
		const user = message.mentions.users.first() || message.author;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setColor("Random");

		message.reply({ embeds: [embed] });
	},
};