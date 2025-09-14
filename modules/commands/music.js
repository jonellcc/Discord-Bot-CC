const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { AttachmentBuilder } = require('discord.js');
const ytSearch = require('yt-search');

const cacheFolderPath = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheFolderPath)) {
    fs.mkdirSync(cacheFolderPath);
}

module.exports = {
    config: {
        name: 'music',
        description: 'Play a song from YouTube',
        usage: 'music <song name>',
        cooldown: 10,
        permission: 0,
        usePrefix: false,
    },
    letStart: async function ({message, args}) {
        const query = args.join(' ');
        if (!query) return message.reply('Please provide a song name.');

        try {
            const browsingMessage = await message.reply('🔍 Searching YouTube...');

            const searchResults = await ytSearch(query);
            const firstResult = searchResults.videos[0];
            if (!firstResult) {
                await browsingMessage.delete();
                return message.reply('No results found.');
            }

            const apiUrl = `https://ccproject.serv00.net/ytdl2.php?url=${firstResult.url}`;
            const response = await axios.get(apiUrl);

            const audioUrl = response.data.download;
            const audioTitle = response.data.title;
            const audioDuration = firstResult.timestamp;
            const youtubeLink = firstResult.url;
            const audioFileName = `${audioTitle.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
            const audioFilePath = path.join(cacheFolderPath, audioFileName);

            const audioStream = await axios.get(audioUrl, { responseType: 'stream' });
            const writer = fs.createWriteStream(audioFilePath);
            audioStream.data.pipe(writer);

            writer.on('finish', async () => {
                const attachment = new AttachmentBuilder(audioFilePath);
                const caption = `🎶 **Title**: ${audioTitle}\n⏱️ **Duration**: ${audioDuration}\n🔗 ${youtubeLink}`;
                await browsingMessage.delete();
                message.reply({ content: caption, files: [attachment] });
            });

            writer.on('error', async () => {
                await browsingMessage.delete();
                message.reply('An error occurred while downloading the audio.');
            });

        } catch {
            await message.reply('An error occurred while fetching the song.');
        }
    },
};