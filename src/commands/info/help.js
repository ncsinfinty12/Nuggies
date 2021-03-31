/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
// const help = require('../../../data/helpmessages.json');
const config = require('../../../utils/config.json');

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


module.exports.run = async (client, message, args, utils, data) => {
	const prefix = data.guild.prefix;
	if (!args[0]) {
		const a = new Discord.MessageEmbed()
			.setTitle('Hello! I\'m Nuggies!')
			.setDescription('For more info about a specific command: use .help {command} \n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=1609952759&scope=applications.commands%20bot) ・ [support server](https://https://discord.gg/zzURhQGpRY)')
			.addField('<:slash:782701715479724063> Slash commands', `\`${prefix}help slash-commands\``, true)
			.addField('<:bfdmoderator:807662459879817236> Moderation', `\`${prefix}help moderation\``, true)
			.addField('<:information:807646586884063283> Info', `\`${prefix}help info\``, true)
			.addField('<a:LX_Yay:807646869948727307> Fun', `\`${prefix}help fun\``, true)
			.addField('<a:distraction:807647150438744064> Actions', `\`${prefix}help actions\``, true)
			.addField('<a:Loading:785190101105508373> More', `\`${prefix}help more\``, true)
			.addField('⚙ Utility', `\`${prefix}help utility\``, true)
			.addField('<a:music_disc:826830791115931719>', `\`${prefix}help music\``, true)
			.setFooter('Check out our website:  https://nuggetdev.com/')
			.setThumbnail(client.user.avatarURL({ type:  'png' }))
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
		if (args[0] === 'music') {
			const musicembed = new Discord.MessageEmbed()
				.setTitle('Info Commands')
				.setDescription('`disconnect`, `loop`, `nowplaying`, `pause`, `play`, `queue`, `resume`, `skip`, `volume`')
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(musicembed);
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
		if (args[0] === 'slash-commands') {
			const slashCmdsembed = new Discord.MessageEmbed()
				.setTitle('Slash Commands')
				.setDescription('`/meme`, `/cat`, `/8ball`, `/echo`, `/support` (use @Nuggies register) to register')
				.setColor('RANDOM')
				.setFooter('Page 1/1');
			return message.channel.send(slashCmdsembed);
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