const gradient = require('gradient-string');
const chalk = require('chalk');

const gradients = {
		lime: gradient('#32CD32', '#ADFF2F'),
		cyan: gradient('#00FFFF', '#00BFFF')
};

const gradientText = (text, color) => (gradients[color] ? gradients[color](text) : text);
const boldText = (text) => chalk.bold(text);

function logDiscordMessage(message) {
		if (!message || !message.author) return;

		const now = new Date();

		console.log(gradientText("━━━━━━━━━━[ MESSAGE LOG ]━━━━━━━━━━", 'lime'));
		console.log(gradientText("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓", 'lime'));
		console.log(`${boldText(gradientText(`┣➤ User: ${message.author.username}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ User ID: ${message.author.id}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Server: ${message.guild?.name || "Direct Message"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Server ID: ${message.guild?.id || "N/A"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Channel: ${message.channel.name || "N/A"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Channel ID: ${message.channel.id}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Message: ${message.content}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Time: ${now.toLocaleString()}`, 'lime'))}`);
		console.log(gradientText("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛", 'lime'));
}

function logCommandExecution(message, command, args) {
		if (!message || !message.author || !command) return;

		const now = new Date();

		console.log(gradientText("━━━━━━━━━━[ COMMAND EXECUTION LOGS ]━━━━━━━━━━", 'lime'));
		console.log(gradientText("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓", 'lime'));
		console.log(`${boldText(gradientText(`┣➤ Command: ${command.config.name}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Arguments: ${args.length > 0 ? args.join(' ') : "None"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Executed By: ${message.author.username}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ User ID: ${message.author.id}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Server: ${message.guild?.name || "N/A"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Server ID: ${message.guild?.id || "N/A"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Channel: ${message.channel.name || "N/A"}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Channel ID: ${message.channel.id}`, 'lime'))}`);
		console.log(`${boldText(gradientText(`┣➤ Time: ${now.toLocaleString()}`, 'lime'))}`);
		console.log(gradientText("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛", 'lime'));
}

module.exports = {
		logDiscordMessage,
		logCommandExecution
};