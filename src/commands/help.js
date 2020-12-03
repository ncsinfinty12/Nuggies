/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const help = require('../../data/helpmessages.json');

module.exports.run = async (client, message, args, utils) => {
	if(!args[0]) {
		const b = new Discord.MessageEmbed()
			.setTitle('Command list for Nuggies:')
			.setDescription('For more info about a specific Command: \n Use [prefix]help command_name')
			.addField('Moderation', help.mod, true)
			.addField('Fun', help.fun, true)
			.addField('Actions', help.action, true)
			.addField('Information', help.info, true)
			.addField('Music', '*coming soon ..*')
			.addField('misc', help.misc, true)
			.addField('Owner', help.owner, true)
			.setFooter('use "." before every command !')
			.setThumbnail(client.user.displayAvatarURL())
			.setImage('https://media.discordapp.net/attachments/746028038021709965/783744416119783455/x.png')
			.setColor(Math.floor(Math.random() * 16777215));
		message.channel.send(b);
	}
	else{
		const command = args[0];
		if (client.commands.has(command)) {
			const cmd = client.commands.get(command);
			const b = new Discord.MessageEmbed()
				.setTitle('commmand info:')
				.addField('``Description:``', cmd.help.description, true)
				.addField('``Usage:``', cmd.help.usage, true);
			message.channel.send(b);
			return;

		}
		else {
			return message.reply('That command doesn\'t exist!');
		}
	}
};

module.exports.help = {
	aliases: ['halp'],
	name: 'help',
	description: 'nein',
	usage: 'gayrate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};