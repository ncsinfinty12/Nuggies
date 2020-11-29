/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	var user;
	if(!message.mentions.users.first()){user = message.author}
	else{ user = message.mentions.users.first()}
	const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1)
	const embed = new Discord.MessageEmbed()
		.setTitle(`${user.username}'s gayrate`)
		.setDescription(`${user.username} is ${rate}% gay`)
	message.channel.send(embed)
};


module.exports.help = {
	aliases: [],
	name: 'gayrate',
	description: 'nein',
	usage: 'gayrate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};