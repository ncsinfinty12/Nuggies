/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
const Discord = require('discord.js');
const muteRoleModel = require('../../../models/muteRoleSchema');

module.exports.run = async (client, message, args, utils, data) => {
	if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE ROLES` permission');

	let muteRoleId;
	if(data.guild.mute_role == 'null') {
		muteRoleId = message.guild.roles.cache.find(r => r.name === 'Muted');
	}
	else { muteRoleId = message.guild.roles.cache.find(r => r.id === data.guild.mute_role); }

	// This check isn't required but just in case
	if (!muteRoleId) return message.channel.send('There seems to be an issue fetching the data. Please mute someone first!');

	const member = message.mentions.members.first();
	if (!member) {return message.channel.send('Please mention a user or provide a valid user ID you want to unmute!');}

	if (member === message.member) {return message.channel.send('You cannot mute yourself');}

	if (member === message.guild.me) return message.channel.send('You cannot mute me');

	if (member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send('You cannot mute someone with an equal or higher role');}

	if(member.roles.highest.position > message.guild.me.roles.highest.position) {return message.channel.send('My highest role is lower than the mentioned user\'s role');}

	let reason = args.slice(1).join(' ');
	if (!reason) reason = '`Not Specified`';
	if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

	if (!member.roles.cache.has(muteRoleId.id)) return message.channel.send('Provided member is not muted!');

	// Unmute member
	try {
		await member.roles.remove(muteRoleId);
	}
	catch (err) {
		console.log(err);
		return message.channel.send(`Failed to unmute. Please check role heirarchy!\n${err.message}`);
	}

	const muteEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setDescription(`${member} has now been unmuted.`)
		.addField('Moderator', message.member, true)
		.addField('Member', member, true)
		.addField('Reason', reason);
	message.channel.send(muteEmbed);
};

module.exports.help = {
	aliases: [],
	name: 'unmute',
	description: 'Unmutes a muted member',
	usage: config.prefix + 'unmute @user',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 1000,
};