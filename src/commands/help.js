/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const help = require('../../data/helpmessages.json');

module.exports.run = async (client, message, args, utils) => {
	if(!args[0]) {
		const b = new Discord.MessageEmbed()
			.setTitle('Command list for Nuggies:')
			.addField('For more info about a specific Command:", "Use [prefix]help command_name')
			.addField('Moderation', help.mod)
			.addField('Fun', help.fun)
			.addField('Information', help.info)
			.addField('misc', help.misc)
			.addField('Owner', help.owner)
			.setFooter('use "." before every command !')
			.setColor(Math.floor(Math.random() * 16777215));
		message.channel.send(b);
	}
};

module.exports.help = {
	aliases: [],
	name: 'halp',
	description: 'nein',
	usage: 'gayrate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};