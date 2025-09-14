const axios = require("axios");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
		config: {
				name: "shoti",
				description: "Get a random Shoti video",
				usage: "shoti",
				cooldown: 5,
				permission: 0,
				usePrefix: false,
		},
		letStart: async function ({ message }) {
				try {
						const loadingEmbed = new EmbedBuilder()
								.setColor(0x00AEFF)
								.setTitle("🎥 Requesting Shoti video...")
								.setDescription("Please wait while we fetch the video.")
								.setTimestamp();

						const loadingMessage = await message.reply({ embeds: [loadingEmbed] });

						const response = await axios.get("http://shotiapi.joncll.serv00.net/shoti.php?shoti");
						const data = response.data;

						if (!data.download) {
								await loadingMessage.delete();
								return message.reply("No video found, try again.");
						}

						const videoBuffer = await axios.get(data.download, { responseType: "arraybuffer" });
						const attachment = new AttachmentBuilder(Buffer.from(videoBuffer.data), { name: "shoti.mp4" });

						const caption = `🎥 **@${data.username}**\n🌍 Region: ${data.region}\n📝 ${data.desc || "No description"}`;

						await loadingMessage.delete();
						await message.reply({ content: caption, files: [attachment] });
				} catch {
						message.reply("An error occurred while fetching the Shoti video.");
				}
		},
};