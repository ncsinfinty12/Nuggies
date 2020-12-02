/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args, utils) => {
	console.log(message.guild);
};

module.exports.help = {
	aliases: [],
	name: 'test',
	description: 'nein',
	usage: 'suggest',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};