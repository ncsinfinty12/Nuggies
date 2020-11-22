/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
	if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Invalid Permissions');
	const User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!User) return message.channel.send('Invalid User');
	let banReason = args.join(' ').slice(22);
	if (!banReason) {
		banReason = 'None';
	}
	User.ban({ reason: banReason });
	const person = message.mentions.users.first();
	const embed = new Discord.MessageEmbed()
		.setTitle(person.username + ' got kicked by ' + message.author.username)
		.setImage('https://media1.tenor.com/images/d8247f1369dd1ab6ebe9cb772ca12b96/tenor.gif?itemid=18150385');
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'kick',
	description: 'nein',
	usage: 'kick',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};