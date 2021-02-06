/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	let time = args[0];
	const unit = args[1];
	let words = args.join(' ');
	words = words.length;
	const second = ['s', 'sec', 'second', 'seconds'];
	const hour = ['h', 'hour', 'hours'];
	const minute = ['m', 'min', 'minute', 'minutes'];
	const all = ['m', 'min', 'minute', 'minutes', 'h', 'hour', 'hours', 's', 'sec', 'second', 'seconds'];
	if(second.includes(unit)) {
		time = parseInt(time);
		message.channel.send(`I will remind you in ${time} seconds`);
		setTimeout(function() {
			message.channel.send(`${message.author}, ${args.join(' ')}`);
		}, time * 1000);
	}
	if(minute.includes(unit)) {
		time = parseInt(time);
		message.channel.send(`I will remind you in ${time} minutes`);
		setTimeout(function() {
			message.channel.send(`${message.author}, ${args.join(' ')}`);
		}, time * 1000 * 60);
	}
	if(hour.includes(unit)) {
		time = parseInt(time);
		message.channel.send(`I will remind you in ${time} hours`);
		setTimeout(function() {
			message.channel.send(`${message.author}, ${args.join(' ')}`);
		}, time * 1000 * 60 * 60);
	}
	if(!all.includes(unit)) {
		message.channel.send('Please send a valid time :-\n```$timer 30 seconds Like this```');
	}
};


module.exports.help = {
	aliases: ['timer'],
	name: 'remindme',
	description: 'Think you\'ll forget the thing your mom told you to do? Just set a reminder',
	usage: config.prefix + 'remindme 1 hour I gotta dance',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'More',
	disable: false,
	cooldown: 1000,
};