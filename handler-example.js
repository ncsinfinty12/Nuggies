/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
// code here
};

module.exports.help = {
	aliases: [],
	name: 'yay',
	description: 'yay',
	usage: config.prefix + 'yay',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
	disable: false,
};