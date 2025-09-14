const { logDiscordMessage } = require('./logger');

const handleMention = async (message, client, config) => {
		if (!message.mentions.has(client.user)) return;

		const botMention = `<@${client.user.id}>`;
		const content = message.content.trim();
		const botName = client.user.username;

		// Check if the message is only a mention
		if (content === botMention) {
				message.reply(`Hello there, ${message.author.username}. I'm ${botName}. Type ${config.prefix}help to see more commands.`);
				return;
		}

		// Remove the bot mention from the content
		const args = content.replace(botMention, "").trim().split(" ");
		const commandName = args.shift()?.toLowerCase();

		const command = client.commands.get(commandName) || 
										client.commands.find(cmd => cmd.config.aliases?.some(alias => commandName.includes(alias)));

		if (!command) return;

		logDiscordMessage({
				username: message.author.username,
				userId: message.author.id,
				content: message.content,
				time: new Date().toLocaleString()
		});

		try {
				await command.letStart({ args, message, discord: { client } });
		} catch (error) {
				console.error("Error executing command:", error);
				message.reply("❌ | An error occurred while processing your request.");
		}
};

module.exports = { handleMention };