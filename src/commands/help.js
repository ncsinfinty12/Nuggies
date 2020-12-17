/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const help = require('../../data/helpmessages.json');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!args[0]) {
		const help = new Discord.MessageEmbed()
			.setTitle('Hello! I\'m Nuggies!')
			.setDescription('For more info about a specific command: \n Use [prefix]help command_name')
			.addField('Moderation', help.mod, true)
			.addField('Fun', help.fun, true)
			.addField('Actions', help.action, true)
			.addField('Information', help.info, true)
			.addField('Music', 'Coming soon:tm: :eyes:')
			.addField('More', help.misc, true)
			.addField('Owner', help.owner, true)
			.setFooter('Want to change the prefix? Run the .prefix command!')
			.setThumbnail(client.user.displayAvatarURL())
			.setImage('https://media.discordapp.net/attachments/783289401165873182/784101832997470229/unknown.png')
			.setColor(Math.floor(Math.random() * 16777215));
		message.channel.send(help);
	}
	else{
		const command = args[0];
		if (client.commands.has(command)) {
			const cmd = client.commands.get(command);
			const b = new Discord.MessageEmbed()
				.setTitle('Command help!')
				.addField('``Description:``', cmd.help.description, true)
				.addField('``Usage:``', cmd.help.usage, true);
			message.channel.send(b);
			return;

		}
		else {
			return message.reply(':x: I couldn\'t find that command!');
		}
	}
};

module.exports.help = {
	aliases: ['halp'],
	name: 'help',
	description: 'You can\'t be helped 😔',
	usage: config.prefix + 'help',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};
