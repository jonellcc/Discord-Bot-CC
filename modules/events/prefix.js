const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: 'prefix',
		description: 'Displays the current command prefix.',
	},

	events: ({ discord }) => {
		const client = discord.client;

		const configPath = './config.json';
		let prefix = '!';

		try {
			const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
			prefix = configData.prefix || '!';
		} catch (error) {
			console.error('Error reading config.json:', error);
		}

		client.on('messageCreate', (message) => {
			if (message.author.bot || !message.guild) return;

			const content = message.content.trim().toLowerCase();

			if (content === `prefix`) {
				const embed = new EmbedBuilder()
					.setColor('#0099FF')
					.setTitle('Current Prefix')
					.setDescription(`The current prefix for commands is \`${prefix}\`.`)
					.setFooter({ text: 'Use this prefix to run other commands.' });

				const helpButton = new ButtonBuilder()
					.setCustomId('help')
					.setLabel('Help')
					.setStyle(ButtonStyle.Primary);

				const aboutButton = new ButtonBuilder()
					.setCustomId('about')
					.setLabel('About')
					.setStyle(ButtonStyle.Secondary);

				const row = new ActionRowBuilder().addComponents(helpButton, aboutButton);

				message.reply({ embeds: [embed], components: [row] });
			}
		});

		client.on('interactionCreate', async (interaction) => {
			if (!interaction.isButton()) return;

			const prefix = '!'; // Get the prefix

			if (interaction.customId === 'help') {
				const helpMessage = `${prefix}help`;
				await interaction.reply({ content: `Triggered the command: ${helpMessage}`, ephemeral: true });

				const helpCommand = client.commands.get('help');
				if (helpCommand && helpCommand.letStart) {
					await helpCommand.letStart(interaction);
				} else if (helpCommand) {
					await helpCommand.execute(interaction);
				}
			} else if (interaction.customId === 'about') {
				const aboutMessage = `${prefix}about`;
				await interaction.reply({ content: `Wait...: ${aboutMessage}`, ephemeral: true });

				const aboutCommand = client.commands.get('about');
				if (aboutCommand && aboutCommand.letStart) {
					await aboutCommand.letStart(interaction);
				} else if (aboutCommand) {
					await aboutCommand.execute(interaction);
				}
			}
		});
	},
};