/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	message.channel.send('Pinging...').then(m =>{
		const ping = m.createdTimestamp - message.createdTimestamp;

		const embed = new Discord.MessageEmbed()
			.setAuthor(`Pong! latency is ${ping}ms`)
			.setColor('Your Color');
		m.edit(embed);
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