const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "userinfo",
		description: "Show information about a user.",
	},

	letStart: async ({ message }) => {
		const member = message.mentions.members.first() || message.member;
		const user = member.user;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Info`)
			.setThumbnail(user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setColor("Blue")
			.addFields(
				{ name: "Username", value: user.tag, inline: true },
				{ name: "ID", value: user.id, inline: true },
				{ name: "Account Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
				{ name: "Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
				{ name: "Roles", value: member.roles.cache.map(r => r).join(" ") || "None", inline: false }
			);

		message.reply({ embeds: [embed] });
	},
};