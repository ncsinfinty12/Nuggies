/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const osutils = require('os-utils');
const version = require('../../../package.json');
const fs = require('fs');
const config = require('../../../utils/config.json');
const settings = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	// eslint-disable-next-line prefer-const
	let milliseconds = parseInt((client.uptime % 1000) / 100);
	let	seconds = parseInt((client.uptime / 1000) % 60);
	let	minutes = parseInt((client.uptime / (1000 * 60)) % 60);
	let	hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
	let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
	const values = await client.shard.fetchClientValues('guilds.cache.size');
	const users = await client.shard.fetchClientValues('users.cache.size');
	const channels = await client.shard.fetchClientValues('channels.cache.size');

	days = (days < 10) ? '0' + days : days;
	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;

	const globalprefix = settings.prefix;
	osutils.cpuUsage(function(v) {
		const embed = new Discord.MessageEmbed()
			.setColor(0x7289DA)
			.setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setTimestamp()
			.addField('Nuggies', 'Show the bot\'s stats.')
			.addField('-------------------------------------------------------------------------------', '----------------------------------------------------------------------------')
			.addField('Global Prefix', globalprefix, true)
			.addField('Total Servers', values.reduce((acc, count) => acc + count, 0), true)
			.addField('Total Channels', channels.reduce((acc, count) => acc + count, 0), true)
			.addField('Total Users', users.reduce((acc, count) => acc + count, 0), true)
			.addField('Bot Version', version['version'], true)
			.addField('Library', 'Discord.js v12', true)
			.addField('Developers', `${config.ownername1} \n ${config.ownername2} \n ${config.ownername3} \n ${config.ownername4} \n ${config.ownername5}`, true)
			.addField('-------------------------------------------------------------------------------', '----------------------------------------------------------------------------')
			.addField('Platform', osutils.platform(), true)
			.addField('VPS CPU Cores', osutils.cpuCount() + ' Cores', true)
			.addField('CPU Usage', `${(v * 100).toString().split('.')[0] + '.' + (v * 100).toString().split('.')[1].split('')[0] + (v * 100).toString().split('.')[1].split('')[1]}%`, true)
			.addField('Total Memory', osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1] + 'MB', true)
			.addField('RAM Usage Of VPS', `${(osutils.totalmem() - osutils.freemem()).toString().split('.')[0] + '.' + (osutils.totalmem() - osutils.freemem()).toString().split('.')[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split('.')[1].split('')[1]}/${osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1]}MB`, true)
			.addField('RAM Usage Of Bot', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB/' + osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1] + 'MB', true)
			.addField('RAM Usage Of VPS %', `${(100 - osutils.freememPercentage() * 100).toString().split('.')[0] + '.' + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[1]}%`, true)
			.addField('Ping', Math.round(client.ws.ping) + 'ms', true)
			.addField('Uptime', days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + '.' + milliseconds + 's', true);
		message.channel.send({ embed });
	});

};

module.exports.help = {
	aliases: ['botstats'],
	name: 'stats',
	description: 'Get information about me',
	usage: config.prefix + 'stats',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};