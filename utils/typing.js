module.exports = {
		handleTyping: async (message, client) => {
				if (message.channel && message.channel.type === 0) {
						await message.channel.sendTyping();
				}
		}
};