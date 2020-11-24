/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Invalid Permissions');
	let number = args.join(' ');
	number = parseInt(number);
	message.channel.bulkDelete(number + 1);
	number = number.toString();
	message.channel.send(number + ' messages have been deleted').then(m =>{
		setTimeout(() =>{
			m.delete();
		}, 5000);
	});
};


module.exports.help = {
	aliases: [],
	name: 'clear',
	description: 'nein',
	usage: 'clear',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'moderation',
};