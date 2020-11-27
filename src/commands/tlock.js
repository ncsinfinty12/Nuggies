/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const ms = require('ms');
module.exports.run = async (client, message, args, utils) => {
	if (!client.lockit) client.lockit = [];
	const time = args.join(' ');
	const validUnlocks = ['release', 'unlock'];
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
	if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

	if (validUnlocks.includes(time)) {
		message.channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: null,
		}).then(() => {
			message.channel.send('channel unlocked');
			clearTimeout(client.lockit[message.channel.id]);
			delete client.lockit[message.channel.id];
		}).catch(error => {
			console.log(error);
		});
	}
	else {
		message.channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: false,
		}).then(() => {
			message.channel.send(`**${message.author.username}** just locked the channel for ${ms(ms(time), { long:true })}`).then(() => {

				client.lockit[message.channel.id] = setTimeout(() => {
					message.channel.createOverwrite(message.guild.id, {
						SEND_MESSAGES: null,
					}).then(message.channel.send('channel unlocked, :wink:')).catch(console.error);
					delete client.lockit[message.channel.id];
				}, ms(time));

			}).catch(error => {
				console.log(error);
			});
		});
	}
};

module.exports.help = {
	aliases: [],
	name: 'tlock',
	description: 'nein',
	usage: '.tlock <time>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
};