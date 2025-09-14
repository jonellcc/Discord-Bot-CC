module.exports = {
		config: {
				name: 'hi', // Name of the event
				description: 'Responds with a hi message', // Description of the event
		},

		events: ({ discord }) => {
				const client = discord.client;

				// Listen for 'messageCreate' event
				client.on('messageCreate', (message) => {
						if (message.author.bot || !message.guild) return;

						// Check if the message is exactly 'hi'
						if (message.content.toLowerCase() === 'hi') {
								message.reply('Hi!');
						}
				});
		},
};
