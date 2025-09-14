const axios = require("axios");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
		config: {
				name: "tiktok-autodl",
				description: "Automatically downloads TikTok videos when a link is detected.",
		},

		events: ({ discord }) => {
				const client = discord.client;

				client.on("messageCreate", async (message) => {
						if (message.author.bot) return;

						const regex = /(https?:\/\/(?:www\.)?tiktok\.com\/[^\s]+)/gi;
						const match = message.content.match(regex);

						if (match && match[0]) {
								const tiktokUrl = match[0];
								try {
										const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}`;
										const response = await axios.get(apiUrl);
										const data = response.data.data;

										if (!data || !data.play) return;

										const videoBuffer = await axios.get(data.play, { responseType: "arraybuffer" });
										const attachment = new AttachmentBuilder(Buffer.from(videoBuffer.data), { name: "tiktok.mp4" });

										const caption = `🎵 **${data.title || "No title"}**\n👤 @${data.author.unique_id}\n❤️ ${data.digg_count} | 💬 ${data.comment_count}\n🔗 ${tiktokUrl}`;

										await message.reply({ content: caption, files: [attachment] });
								} catch {
										message.reply("❌ Failed to download TikTok video.");
								}
						}
				});
		},
};