/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
// code here
};

module.exports.help = {
	aliases: ['aliases'],
	name: 'name',
	description: 'description',
	usage: config.prefix + 'usage',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'category',
	disable: false,
};