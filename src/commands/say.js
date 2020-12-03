/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const saymessage = args.join(' ');
	message.delete().catch(err => console.log(err));
	message.channel.send('**' + saymessage + '**\n\n -' + message.author.username);
};


module.exports.help = {
	aliases: ['echo'],
	name: 'say',
	description: 'Make me say something',
	usage: config.prefix + 'say',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};