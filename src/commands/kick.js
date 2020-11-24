/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Invalid Permissions');
	const User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!User) return message.channel.send('Invalid User');
	if (User.id === message.author.id) return message.channel.send('you cant kick yourself!');
	if (message.member.roles.highest.position < User.roles.highest.position) {
		message.channel.send('you cant ban the member as he is a higher role than you!');
		return;
	}
	let banReason = args.join(' ');
	if (!banReason) {
		banReason = 'None';
	}
	User.kick({ reason: banReason });
	const person = message.mentions.users.first();
	const embed = new Discord.MessageEmbed()
		.setTitle(person.username + ' got kicked by ' + message.author.username)
		.setImage('https://cdn.discordapp.com/attachments/780334622164254724/780337021226713088/giphy.gif');
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'kick',
	description: 'nein',
	usage: 'kick',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
};