const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
		data: new SlashCommandBuilder()
				.setName('help')
				.setDescription('Show the list of available commands'),

		async execute(interaction) {
				const commandsDir = path.join(__dirname);
				const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

				const visibleCommands = commandFiles
						.map(file => {
								const command = require(path.join(commandsDir, file));
								// Get the command name directly from the SlashCommandBuilder setName method
								return `• **/${command.data.name}** — ${command.data.description || 'No description available'}`;
						})
						.filter(Boolean)
						.sort();

				if (visibleCommands.length === 0) {
						return interaction.reply({
								embeds: [new EmbedBuilder()
										.setColor('#E74C3C')
										.setTitle('No Commands Available')
										.setDescription('There are no public commands available right now.')
								]
						});
				}

				const pageSize = 5;
				const totalPages = Math.ceil(visibleCommands.length / pageSize);
				let currentPage = 0;

				const generateEmbed = (page) => {
						const start = page * pageSize;
						const end = start + pageSize;

						return new EmbedBuilder()
								.setColor('#3498DB')
								.setTitle(`Hello There ${interaction.user.username}!`)
								.setDescription(
										`Here’s the list of my public commands:\n\n${visibleCommands.slice(start, end).join("\n")}\n\nUse the slash commands to interact!`
								)
								.setFooter({ text: `Page ${page + 1} of ${totalPages} • ${new Date().toLocaleString()}` });
				};

				const row = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
								.setCustomId('prev')
								.setLabel('⬅️ Previous')
								.setStyle(ButtonStyle.Primary)
								.setDisabled(true),

						new ButtonBuilder()
								.setCustomId('next')
								.setLabel('➡️ Next')
								.setStyle(ButtonStyle.Primary)
								.setDisabled(totalPages <= 1)
				);

				const sentMessage = await interaction.reply({
						content: `👋 **Hey there, ${interaction.user.username}!** Need help? Here’s what I can do:`,
						embeds: [generateEmbed(currentPage)],
						components: [row]
				});

				const collector = sentMessage.createMessageComponentCollector({ time: 60000 });

				collector.on('collect', async (interaction) => {
						if (interaction.user.id !== interaction.user.id) {
								return interaction.reply({ content: "❌ You can't interact with this help menu!", ephemeral: true });
						}

						if (interaction.customId === 'prev') {
								currentPage--;
						} else if (interaction.customId === 'next') {
								currentPage++;
						}

						row.components[0].setDisabled(currentPage === 0);
						row.components[1].setDisabled(currentPage === totalPages - 1);

						await interaction.update({ embeds: [generateEmbed(currentPage)], components: [row] });
				});

				collector.on('end', () => {
						sentMessage.edit({ components: [] });
				});
		}
};