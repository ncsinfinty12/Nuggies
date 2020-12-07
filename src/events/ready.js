const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = () => {
	console.log('bot is online.');
	client.user.setActivity(`watching ${client.guilds.cache.size} servers !`, { type: 'COMPETING', url: 'https://discord.gg/zzURhQGpRY' });
};