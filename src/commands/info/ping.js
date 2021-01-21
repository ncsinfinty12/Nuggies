/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const start = message.createdTimestamp;
	const users = await client.shard.fetchClientValues('users.cache.size');
	message.channel.send({ embed: { description: 'pinging...', color: 0x00FFFF } }).then(m => {

		const end = Date.now();

		const embed = new Discord.MessageEmbed()
			.setAuthor('🏓Pong!', message.author.avatarURL())
			.addFields(
				{ name: 'API Latency', value: Math.round(client.ws.ping) + 'ms', inline: true },
				{ name: 'Message Latency', value: end - start + 'ms', inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: 'Commands Loaded', value: client.commands.size, inline: true },
				{ name: 'Users Cached', value: users.reduce((acc, count) => acc + count, 0), inline: true },
			)
			.setColor('RANDOM');
		m.edit(embed).catch(e => message.channel.send(e));
	});
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
	category: 'misc',
	disable: false,
};