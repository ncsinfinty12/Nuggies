/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const m = await message.channel.send('🏓 Pinging....');
	const start = message.createdTimestamp;
	const embed = new Discord.MessageEmbed()
		.setAuthor('🏓Pong!', message.author.avatarURL())
		.addFields(
			{ name: 'API Latency', value: Math.round(client.ws.ping) + 'ms', inline: true },
			{ name: 'Message Latency', value: m.createdTimestamp - message.createdTimestamp + 'ms', inline: true },
		)
		.setFooter('Commands Loaded: ' + client.commands.size)
		.setColor('RANDOM');
	return m.delete(), message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'ping',
	description: 'See bot\'s ping',
	usage: config.prefix + 'ping',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};