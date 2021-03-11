/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `MANAGE MESSAGES` permission !');
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Invalid Permissions');
	let number = args.join(' ');
	if(isNaN(number)) return message.channel.send('That is not a number');
	number = parseInt(number);
	if(number < 1) return message.reply('Please provide a number larger than 1');
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
		}, 1500);
	});
};


module.exports.help = {
	aliases: ['purge'],
	name: 'clear',
	description: 'Delete given number of messages',
	usage: config.prefix + 'clear 10',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 1000,
};