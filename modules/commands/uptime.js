const os = require("os");
const { EmbedBuilder } = require("discord.js");

module.exports = {
		config: {
				name: "uptime",
				description: "Show bot uptime and system information",
				usage: "uptime",
				cooldown: 5,
				permission: 0,
				usePrefix: true,
		},
		letStart: async function ({ message }) {
				const totalSeconds = Math.floor(process.uptime());
				const days = Math.floor(totalSeconds / 86400);
				const hours = Math.floor((totalSeconds % 86400) / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;
				const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

				const embed = new EmbedBuilder()
						.setColor(0x00AEFF)
						.setTitle("🖥️ Bot & System Info")
						.addFields(
								{ name: "⏱️ Uptime", value: uptime, inline: false },
								{ name: "🖥️ OS", value: `${os.type()} ${os.release()} (${os.platform()})`, inline: false },
								{ name: "🧩 Arch", value: os.arch(), inline: true },
								{ name: "💻 CPU", value: os.cpus()[0].model, inline: false },
								{ name: "📦 RAM", value: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`, inline: true },
								{ name: "📂 Free RAM", value: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`, inline: true },
						)
						.setFooter({ text: `Hostname: ${os.hostname()}` })
						.setTimestamp();

				await message.reply({ embeds: [embed] });
		},
};