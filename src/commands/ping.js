/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const start = Date.now();

	message.channel.send({ embed: { description: ':ping_pong:pinging...', color: 0x00FFFF } }).then(m => {

		const end = Date.now();

		const embed = new Discord.MessageEmbed()
			.setAuthor(':ping_pong:Pong!', message.author.avatarURL())
			.addField('API Latency', Math.round(client.ws.ping) + 'ms', true)
			.addField('Message Latency', end - start + 'ms', true)
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