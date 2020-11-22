/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
	let number = args.join(' ');
	number = parseInt(number);
	message.channel.bulkDelete(number);
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
	args: false,
	restricted: false,
	category: 'misc',
};