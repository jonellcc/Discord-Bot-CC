const axios = require("axios");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
		config: {
				name: "tiktok",
				description: "Download TikTok video",
				usage: "tiktok <url>",
				cooldown: 5,
				permission: 0,
				usePrefix: false,
		},
		letStart: async function ({ message, args }) {
				const query = args[0];
				if (!query) return message.reply("Please provide a TikTok video link.");

				try {
						const loadingEmbed = new EmbedBuilder()
								.setColor(0xFF0050)
								.setTitle("📲 Requesting TikTok video...")
								.setDescription("Please wait while we fetch the video.")
								.setTimestamp();

						const loadingMessage = await message.reply({ embeds: [loadingEmbed] });

						const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(query)}`;
						const response = await axios.get(apiUrl);
						const data = response.data.data;

						if (!data || !data.play) {
								await loadingMessage.delete();
								return message.reply("No video found, please check the link.");
						}

						const videoBuffer = await axios.get(data.play, { responseType: "arraybuffer" });
						const attachment = new AttachmentBuilder(Buffer.from(videoBuffer.data), { name: "tiktok.mp4" });

						const caption = `🎵 **${data.title || "No title"}**\n👤 @${data.author.unique_id}\n❤️ ${data.digg_count} | 💬 ${data.comment_count}\n🔗 ${query}`;

						await loadingMessage.delete();
						await message.reply({ content: caption, files: [attachment] });
				} catch {
						message.reply("An error occurred while fetching the TikTok video.");
				}
		},
};