const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = () => {
	console.log('bot is online.');
	client.user.setActivity(`${client.guilds.cache.size} users !`, { type: 'WATCHING' });
};