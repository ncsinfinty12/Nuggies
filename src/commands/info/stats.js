/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const osutils = require('os-utils');
const fs = require('fs');
const config = require('../../../utils/config.json');
const settings = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils, data) => {
	let totalUsers = 0;
	function sum() {
		client.guilds.cache.forEach(guild => {
			totalUsers += guild.memberCount;
		});
	}
	sum();
	// eslint-disable-next-line prefer-const
	let milliseconds = parseInt((client.uptime % 1000) / 100);
	let	seconds = parseInt((client.uptime / 1000) % 60);
	let	minutes = parseInt((client.uptime / (1000 * 60)) % 60);
	let	hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
	let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

	days = (days < 10) ? '0' + days : days;
	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;
	const globalprefix = settings.prefix;
	const serverPrefix = data.guild.prefix;

	let Prefix;
	if(serverPrefix !== null) Prefix = serverPrefix;
	if(serverPrefix == null) Prefix = globalprefix;
	osutils.cpuUsage(function(v) {
		console.log(config.owners);
		const embed = new Discord.MessageEmbed()
			.setColor(0x7289DA)
			.setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setTitle(`Bot Statistics`)
			.addField('Global Prefix <:verifiedDeveloper:785064713389080576>', `\`\`\`yaml\n${globalprefix}\`\`\``, true)
			.addField('Total Servers <a:9689_tick:785181267758809120>', `\`\`\`yaml\n ${client.guilds.cache.size}\`\`\``, true)
			.addField('Support Server <:SupportThumb:811209722883473430>', "[Click To Join](https://discord.gg/BxZUrr3a3u)", true)
			.addField('Library <:nodeJS:785064545013858334>', '```yaml\nDiscord.js v12```', true)
			.addField('Server Prefix 🔗', `\`\`\`yaml\n${Prefix}\`\`\``, true)
			.addField('Visit Website <:chrome:811217850173227040>', "[Click To Visit]( https://nuggetdev.com/)", true)
			.addField('-----------------------------------------------------------------', '---------------------------------------------------------------')
			// .addField('Platform', `\`\`\`yaml\n${osutils.platform()}\`\`\``, true)
			.addField('VPS CPU Cores', `\`\`\`yaml\n${osutils.cpuCount()}` + ' Cores```', true)
			// .addField('CPU Usage', `\`\`\`yaml\n${(v * 100).toString().split('.')[0] + '.' + (v * 100).toString().split('.')[1].split('')[0] + (v * 100).toString().split('.')[1].split('')[1]}%\`\`\``, true)
			.addField('Total Memory', `\`\`\`yaml\n${osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1] + ' MB'}\`\`\``, true)
			.addField('RAM Usage Of VPS', `\`\`\`yaml\n${(osutils.totalmem() - osutils.freemem()).toString().split('.')[0]}/${osutils.totalmem().toString().split('.')[0]} MB (${(100 - osutils.freememPercentage() * 100).toString().split('.')[0] + '.' + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[1]}%)\`\`\``, true)
			.addField('RAM Usage Of Bot', `\`\`\`yaml\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + '/' + `${osutils.totalmem().toString().split('.')[0]}` + ' MB\`\`\`', true)
			// .addField('RAM Usage Of VPS', `\`\`\`yaml\n${(100 - osutils.freememPercentage() * 100).toString().split('.')[0] + '.' + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[1]}%\`\`\``, true)
			.addField('Ping', `\`\`\`yaml\n${Math.round(client.ws.ping)}` + 'ms\`\`\`', true)
			.addField('Uptime', `\`\`\`yaml\n${days + 'd ' + hours + 'h ' + minutes + 'm'}\`\`\``, true)
			.addField('-----------------------------------------------------------------', '---------------------------------------------------------------')
			.addField('Developers', config.owners.join(', '));
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
