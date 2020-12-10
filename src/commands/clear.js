/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Invalid Permissions');
	let number = args.join(' ');
	if(isNaN(number)) return message.channel.send('That is not a number');
	number = parseInt(number);
	if(number > 99) {
		return message.reply('Please provide a number smaller than 100 !').then(m =>{
			setTimeout(() =>{
				m.delete();
			}, 5000);
		});
	}
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
	description: 'Delete given number of messages',
	usage: config.prefix + 'clear 10',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'moderation',
	disable: false,
};