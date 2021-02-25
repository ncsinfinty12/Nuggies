/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const ms = require('ms');

module.exports.run = async (client, message, args, utils, data) => {

	let muteRoleId;

	if(data.guild.mute_role == 'null') {
		muteRoleId = message.guild.roles.cache.find(r => r.name === 'Muted');
	}
	else { muteRoleId = message.guild.roles.cache.find(r => r.id === data.guild.mute_role); }
	if(!muteRoleId) return message.channel.send('Mute role not set for this server. Please set the muterole using the .muterole command!');
	try {
		await message.member.roles.add(muteRoleId);
	}
	catch (err) {
		console.log(err);
		return message.channel.send(`Please check the role hierarchy\n${err.message}`);
	}

	message.channel.send(new Discord.MessageEmbed().setTitle('I muted you. You will be automatically unmuted after 1hr.').setColor('RANDOM'));
	message.member.timeout = message.client.setTimeout(async () => {
		try {
			await message.member.roles.remove(muteRoleId);
		}
		catch (err) {
			console.log(err);
			return message.channel.send('Please check the role hierarchy. Couldnt unmute user', err.message);
		}
	}, 3600000);
};

module.exports.help = {
	aliases: [],
	name: 'selfmute',
	description: 'mute yourself',
	usage: '.selfmute',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 360000 * 5,
};