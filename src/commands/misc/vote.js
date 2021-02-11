/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const b = new Discord.MessageEmbed()
		.setTitle('Please vote for the bot !')
		.setDescription('[Top.gg](https://top.gg/bot/779741162465525790)')
		.setColor('RANDOM');
	message.channel.send(b);
};

module.exports.help = {
	aliases: [],
	name: 'vote',
	description: 'vote for the bot !',
	usage: config.prefix + 'vote',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'More',
	disable: false,
	cooldown: 0,
};