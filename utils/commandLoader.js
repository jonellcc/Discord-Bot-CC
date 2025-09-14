const fs = require('fs');
const path = require('path');
const gradient = require('gradient-string');
const chalk = require('chalk');

const boldText = (text) => chalk.bold(text);

async function loadCommands(client) {
		console.log(boldText(gradient.fruit("━━━━━[ STARTING COMMAND DEPLOYMENT ]━━━━━━━")));

		const commandsPath = path.join(__dirname, '../modules/commands');
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
				try {
						const command = require(path.join(commandsPath, file));
						client.commands.set(command.config.name, command);
						console.log(boldText(gradient.pastel(`[ ${command.config.name} ] > Command loaded`)));
				} catch (error) {
						console.error(boldText(gradient.cristal(`Failed to load command ${file}: ${error.message}`)));
				}
		}

		console.log(boldText(gradient.instagram("━━━━━[ DONE DEPLOYED COMMANDS ]━━━━━━━")));
}

async function loadSlashCommands(client) {
		console.log(boldText(gradient.fruit("━━[ STARTING SLASH COMMAND DEPLOYMENT ]━━━━━━━")));

		const slashCommandsPath = path.join(__dirname, '../modules/slash');
		const commandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
				try {
						const command = require(path.join(slashCommandsPath, file));
						if (command.data) {
								client.slashCommands.set(command.data.name, command);
								console.log(boldText(gradient.pastel(`[ ${command.data.name} ] > Slash Command loaded`)));
						}
				} catch (error) {
						console.error(boldText(gradient.cristal(`Failed to load slash command ${file}: ${error.message}`)));
				}
		}

		console.log(boldText(gradient.instagram("━━━━━[ DONE DEPLOYED SLASH COMMANDS ]━━━━━━━")));
}

module.exports = { loadCommands, loadSlashCommands };