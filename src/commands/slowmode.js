/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Invalid Permissions');
	if (!args[0]) return message.channel.send('You did not specify the time in seconds you wish to set this channel\'s slow mode too!');
	if (isNaN(args[0])) return message.channel.send('That is not a number!');
	try{message.channel.setRateLimitPerUser(args[0], 'It was me');}
	catch(error) {
		message.channel.send('There was an error, check if I have the correct permissions.');
	}
	message.channel.send(`Set the slowmode of this channel to **${args[0]}**`);
};


module.exports.help = {
	aliases: [],
	name: 'slowmode',
	description: 'Set a slowmode in text channel',
	usage: config.prefix + 'slowmode 10',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};