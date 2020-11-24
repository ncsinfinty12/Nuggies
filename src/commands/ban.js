/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Invalid Permissions');
	const User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!User) return message.channel.send('Invalid User');
	if (message.member.roles.highest.position < User.roles.highest.position) {
		message.channel.send('you cant kick the member as he is a higher role than you!');
		return;
	}
	let banReason = args.join(' ');
	if (!banReason) {
		banReason = 'None';
	}
	User.ban({ reason: banReason });
	const person = message.mentions.users.first();
	const embed = new Discord.MessageEmbed()
		.setTitle(person.username + ' got banned by ' + message.author.username)
		.setImage('https://media1.tenor.com/images/d8247f1369dd1ab6ebe9cb772ca12b96/tenor.gif?itemid=18150385');
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'ban',
	description: 'nein',
	usage: 'ban',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
};