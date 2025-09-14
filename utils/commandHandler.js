const { logCommandExecution } = require('./logger');

const handleCommand = async (message, client, config) => {
		if (message.author.bot) return;

		if (!message.content.startsWith(config.prefix)) return;

		const args = message.content.slice(config.prefix.length).trim().split(" ");
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.config.aliases?.includes(commandName));

		if (!command) return;

		logCommandExecution({
				commandName: command.config.name,
				arguments: args.join(' '),
				username: message.author.username,
				userId: message.author.id,
				time: new Date().toLocaleString()
		});

		if (command.config.permission === 1 && !message.member.permissions.has('ADMINISTRATOR')) return;
		if (command.config.permission === 2 && message.author.id !== config.client_id) return;

		await command.letStart({ args, discord: { client, message } });
};

module.exports = { handleCommand };