const Discord = require('discord.js');

module.exports.uCError = function(errorMessage) {
	throw `[Error] | ${errorMessage}`;
};

module.exports.uCWarning = function(warningMessage) {
	console.warn(`[Warning] | ${warningMessage}. Proceeding.`);
};

module.exports.prefix = require('./config.json').prefix;

module.exports.errorEmbed = function(message, errorMessage) {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle(errorMessage);
	message.channel.send({ embed: errorEmbed });
};

module.exports.quickEmbed = function(message, content, color) {
	const quickEmbed = new Discord.MessageEmbed();
	if(color) quickEmbed.setColor(color);
	quickEmbed.setDescription(content);
	message.channel.send({ embed: quickEmbed });
};

module.exports.selectRandom = function(array) {
	if(typeof array !== 'object') return;
	return array[Math.floor((Math.random() * array.length) + 0)];
};

module.exports.timer = function(timestamp) {
	const timeLeft = timestamp - Date.now();
	const days = Math.floor(timeLeft / 86400000);
	const hours = Math.floor(timeLeft / 3600000) - (days * 24);
	const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
	const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	const mseconds = (timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	let string = '';
	if (days) string = string + `${days} ${days == 1 ? 'day ' : 'days '}`;
	if (hours) string = string + `${hours} ${hours == 1 ? 'hour ' : 'hours '}`;
	if (minutes) string = string + `${minutes} ${minutes == 1 ? 'minute ' : 'minutes '}`;
	if (seconds) string = string + `${seconds} ${seconds == 1 ? 'second ' : 'seconds '}`;
	if (!string.length) string = `${mseconds.toFixed(1)} second`;
	return string;
};