const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	config: {
		
		name: 'getlink',
		description: 'Get CDN link for media files',
		aliases: ['getcdn', 'fetchlink'],
		usage: '/getlink',
		cooldown: 10,
 permission: 0,
		usePrefix: false,
	},
		letStart: async function ({message, args }) {
				if (message.reference) {
						const messageId = message.reference.messageId;
						const repliedMessage = await message.channel.messages.fetch(messageId);

						if (repliedMessage.attachments.size > 0) {
								const attachment = repliedMessage.attachments.first();
								const cdnLink = attachment.url;

								const embed = new EmbedBuilder()
										.setColor('#2ECC71')
										.setTitle('CDN Link for Media')
										.setDescription(`Here is the **CDN link** for the media file:\n\n**[Click to View](${cdnLink})**`)
										.setThumbnail(attachment.url);

								const row = new ActionRowBuilder().addComponents(
										new ButtonBuilder()
												.setLabel('📥 Download')
												.setStyle(ButtonStyle.Link)
												.setURL(cdnLink),

										new ButtonBuilder()
												.setCustomId('copy_link')
												.setLabel('📋 Copy Link')
												.setStyle(ButtonStyle.Secondary)
								);

								const sentMessage = await message.reply({ embeds: [embed], components: [row] });

								const collector = sentMessage.createMessageComponentCollector({ time: 60000 });

								collector.on('collect', async (interaction) => {
										if (interaction.customId === 'copy_link') {
												await interaction.reply({ 
														content: `🔗 **CDN link copied:**\n\`${cdnLink}\``, 
														ephemeral: true 
												});
										}
								});

								collector.on('end', () => {
										sentMessage.edit({ components: [] });
								});

						} else {
								const embed = new EmbedBuilder()
										.setColor('#E74C3C')
										.setTitle('Error')
										.setDescription('The replied message does not contain any media attachments.');

								return message.reply({ embeds: [embed] });
						}
				} else {
						const embed = new EmbedBuilder()
								.setColor('#E74C3C')
								.setTitle('Error')
								.setDescription('You need to reply to a message with a media attachment.');

						return message.reply({ embeds: [embed] });
				}
		},
};