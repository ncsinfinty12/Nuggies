/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	if(!message.mentions.users.first()) {
		const number = Math.floor(Math.random() * 18);
		const pp = '=';
		const hmmm = new Discord.MessageEmbed()
			.setTitle('peepee size machine')
			.setDescription(message.author.username + '\'s penis\n8' + (pp.repeat(number)) + 'D');
		message.channel.send(hmmm);
	}
	else{
		const user = message.mentions.users.first();
		const number = Math.floor(Math.random() * 18);
		const pp = '=';
		const hmmm = new Discord.MessageEmbed()
			.setTitle('peepee size machine')
			.setDescription(user.username + '\'s penis\n8' + (pp.repeat(number)) + 'D');
		message.channel.send(hmmm);
	}
};


module.exports.help = {
	aliases: ['pp'],
	name: 'penis',
	description: 'nein',
	usage: 'penis',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};