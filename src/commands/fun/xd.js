/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils, data) => {
	message.delete()
	message.channel.send('xd');
};

module.exports.help = {
	aliases: [],
	name: 'xd',
	description: 'xd',
	usage: config.prefix + 'xd',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 69,
};
