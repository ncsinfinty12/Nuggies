/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Server Info')
		.setThumbnail(message.guild.iconURL())
		.setDescription(`${message.guild}'s information`)
		.addField('Owner', `The owner of this server is ${message.guild.owner}`)
		.addField('Member Count', `This server has ${message.guild.memberCount} members`)
		.addField('Emoji Count', `This server has ${message.guild.emojis.cache.size} emojis`)
		.addField('Roles Count', `This server has ${message.guild.roles.cache.size} roles`);
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'serverinfo',
	description: 'nein',
	usage: 'serverinfo',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};