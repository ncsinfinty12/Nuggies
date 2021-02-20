/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const presence = {
		'dnd': '<:dnd:785124430912290846> Do not disturb',
		'offline': '<:statusoffline:785124410063323136> offline',
		'online': '<:online:785124353628045362> online',
		'idle': '<:statusidle:751227734239477780> idle',
	};
	const userArray = message.content.split(' ');
	const userArgs = userArray.slice(1);
	const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(' ') || x.user.username === userArgs[0]) || message.member;
	const userEmbed = new Discord.MessageEmbed()
		.setAuthor(member.user.tag, member.user.displayAvatarURL())
		.setColor('RANDOM')
		.setThumbnail(member.user.displayAvatarURL({ dynamic : true }))
		// .addField('status', presence[member.presence.status], true)
		.addField('ID 🆔', member.id, true)
		.addField('Display Name 🤔', member.displayName, true)
		.addField('Highest Role 🔝', member.roles.highest.name, true)
		.addField('Roles 🕵️‍♀️', `<@&${member._roles.join('> <@&')}>`, false)
		.addField('Joined On 🗓', member.joinedAt, true)
		.addField('Created On 📅', ` ${(member.user.createdAt)}`, true);


	message.channel.send(userEmbed);
};


module.exports.help = {
	aliases: [],
	name: 'Information',
	description: 'Get information about someone',
	usage: config.prefix + 'whois <@537230099121045504>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
	cooldown: 1000,
};