/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	let user;
	if(!message.mentions.users.first()) {user = message.author;}
	else{ user = message.mentions.users.first();}
	const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);
	const embed = new Discord.MessageEmbed()
		.setTitle(`${user.username}'s simprate`)
		.setDescription(`${user.username} is ${rate}% simp`);
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'simprate',
	description: 'nein',
	usage: 'simprate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};