/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
// const help = require('../../../data/helpmessages.json');
const config = require('../../../utils/config.json');
const PrefiX = require('../../../models/prefixSchema');


module.exports.help = {
	aliases: ['halp'],
	name: 'help',
	description: 'You can\'t be helped 😔',
	usage: config.prefix + 'help',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};


module.exports.run = async (client, message, args, utils) => {
	let prefix;
	const Data = await PrefiX.findOne({ GuildID: message.guild.id });
	if (Data) {
		prefix = Data.Prefix;
	}
	if (!Data) {
		prefix = config.prefix;
	}
	if (!args[0]) {
		const a = new Discord.MessageEmbed()
			.setTitle('Hello! I\'m Nuggies!')
			.setDescription('For more info about a specific command:\n Use . help command_name\n[**Invite Me!**](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=1609952759&scope=applications.commands%20bot)\n[**Website!**](https://nuggies.tech)')
			.addField('Slash commands', '`/meme`, `/cat`, `/8ball`, `/echo` (use @Nuggies register) to register', true)
			.addField('Moderation', `\`${prefix}help moderation\``, true)
			.addField('Info', `\`${prefix}help info\``, true)
			.addField('Fun', `\`${prefix}help fun\``, true)
			.addField('Actions', `\`${prefix}help Actions\``, true)
			.addField('More', `\`${prefix}help more\``, true)
			.addField('Utility', `\`${prefix}help Utility\``, true)
			.setColor('RANDOM');
		message.channel.send(a);
	}
	else {
		let modCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'Moderation') {modCmds += `\`${command.help.name}\`, `;}
		});
		let funCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'Fun') {funCmds += `\`${command.help.name}\`, `;}
		});
		let actionCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'Actions') {actionCmds += `\`${command.help.name}\`, `;}
		});
		let moreCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'More') {moreCmds += `\`${command.help.name}\`, `;}
		});
		let infoCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'Information') {infoCmds += `\`${command.help.name}\`, `;}
		});
		let utilityCmds = '';
		message.client.commands.forEach(command => {
			if (command.config.category == 'Utility') {utilityCmds += `\`${command.help.name}\`, `;}
		});
		if (args[0] === 'info') {
			const infoCmdsembed = new Discord.MessageEmbed()
				.setTitle('Info Commands')
				.setDescription(infoCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(infoCmdsembed);
		}
		if (args[0] === 'fun') {
			const funCmdsembed = new Discord.MessageEmbed()
				.setTitle('Fun Commands')
				.setDescription(funCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(funCmdsembed);
		}
		if (args[0] === 'actions') {
			const ActionsCmdsembed = new Discord.MessageEmbed()
				.setTitle('Action Commands')
				.setDescription(actionCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(ActionsCmdsembed);
		}
		if (args[0] === 'more') {
			const moreCmdsembed = new Discord.MessageEmbed()
				.setTitle('More Commands')
				.setDescription(moreCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(moreCmdsembed);
		}
		if (args[0] === 'utility') {
			const utilityCmdsembed = new Discord.MessageEmbed()
				.setTitle('Utility Commands')
				.setDescription(utilityCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(utilityCmdsembed);
		}
		if (args[0] === 'moderation') {
			const moderationCmdsembed = new Discord.MessageEmbed()
				.setTitle('Moderation Commands')
				.setDescription(modCmds.slice(0))
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(moderationCmdsembed);
		}
		else
		if (client.commands.has(args[0])) {
			const cmd = client.commands.get(args[0]);
			const b = new Discord.MessageEmbed()
				.setTitle('Command help!')
				.addField('``Description:``', cmd.help.description, true)
				.addField('``Usage:``', cmd.help.usage, true)
				.setColor('RANDOM');
			message.channel.send(b);
			return;

		}
		else {
			return message.reply(':x: I couldn\'t find that command!');
		}
	}
};