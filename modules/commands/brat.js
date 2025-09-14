const axios = require("axios");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
		config: {
				name: "brat",
				description: "Generate brat image",
				usage: "brat <text>",
				cooldown: 5,
				permission: 0,
				usePrefix: false,
		},
		letStart: async function ({ message, args }) {
				const query = args.join(" ");
				if (!query) return message.reply("Please provide text.");

				try {
						const response = await axios.get(
								`https://ccprojectsapis.zetsu.xyz/api/brat?text=${encodeURIComponent(query)}&type=direct`,
								{ responseType: "arraybuffer" }
						);

						const attachment = new AttachmentBuilder(Buffer.from(response.data), { name: "brat.png" });
						await message.reply({ files: [attachment] });
				} catch {
						message.reply("An error occurred while generating the image.");
				}
		},
};