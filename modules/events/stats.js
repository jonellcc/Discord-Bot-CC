const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'status',
    description: 'Check RickGDBot server statuses'
  },

  events: ({ discord }) => {
    const client = discord.client;
    const serverid = ['1358120522793226471'];
    const channelid = ['1384857470115119135'];

    const urls = [
      { name: 'Main Website', url: 'https://rickgdps.xyz' },
      { name: 'Dashboard & Database', url: 'https://rickgdps.xyz/datastore/dashboard/api/stats.php' },
      { name: 'RickGDBot Bot Server', url: 'https://cc.rickgdbotmainservercc.giize.com' },
      { name: 'RickGDBot Music Server', url: 'https://www.rickgdbot.xyz' }
    ];

    const getStatusEmoji = (isUp) => isUp ? '🟢' : '🔴';

    const getOverallStatusEmoji = (statuses) => {
      const up = statuses.filter(s => s.status).length;
      if (up === statuses.length) return { emoji: '🟢', text: 'All services are operational', color: 0x00FF00 };
      if (up === 0) return { emoji: '🔴', text: 'All services server are down', color: 0xFF0000 };
      return { emoji: '🟠', text: 'Some server web is down', color: 0xFFA500 };
    };

    const messageMap = new Map();

    const updateStatus = async () => {
      const statuses = await Promise.all(urls.map(async ({ name, url }) => {
        try {
          await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla 5.1' },
            timeout: 5000
          });
          return { name, status: true };
        } catch {
          return { name, status: false };
        }
      }));

      const { emoji, text, color } = getOverallStatusEmoji(statuses);

      const embed = new EmbedBuilder()
        .setTitle('🛰️ RickGDBot Uptime Status')
        .setColor(color)
        .setDescription(statuses.map(s => `${getStatusEmoji(s.status)} **${s.name}**`).join('\n'))
        .addFields({ name: 'Status', value: `${emoji} ${text}` })
        .setFooter({ text: `Updated at ${new Date().toLocaleTimeString()} | Today` });

      for (const sid of serverid) {
        for (const cid of channelid) {
          const key = `${sid}-${cid}`;
          const guild = client.guilds.cache.get(sid);
          if (!guild) continue;
          const channel = guild.channels.cache.get(cid);
          if (!channel) continue;

          if (!messageMap.has(key)) {
            const sentMessage = await channel.send({ embeds: [embed] });
            messageMap.set(key, sentMessage);
          } else {
            const msg = messageMap.get(key);
            msg.edit({ embeds: [embed] }).catch(() => messageMap.delete(key));
          }
        }
      }
    };

    client.once('ready', () => {
      updateStatus();
      setInterval(updateStatus, 180000);
    });
  }
};