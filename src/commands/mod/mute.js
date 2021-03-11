/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const ms = require('ms');

module.exports.run = async (client, message, args, utils, data) => {
	const errEmbed = new Discord.MessageEmbed()
		.setAuthor('⚠️ Please pull the role up in the hierarchy for it to work properly')
		.setDescription(':exclamation: To set a custom mute role, delete the current one and use `$muterole <@​role>`! :exclamation:')
		.setFooter('Please re-run the command to mute the user!');

	if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE ROLES` permission');

	let muteRoleId;

	if(data.guild.mute_role == 'null') {
		muteRoleId = message.guild.roles.cache.find(r => r.name === 'Muted');
	}
	else { muteRoleId = message.guild.roles.cache.find(r => r.id === data.guild.mute_role); }

	if(!muteRoleId) {
		try {
			muteRoleId = await message.guild.roles.create({
				data: { name: 'Muted',
					color: '#484848',
					permissions: [],
				},
				reason: 'No mute role existed on the guild. [ Nuggies ]',
			});

			message.guild.channels.cache.forEach(async (channel) => {
				await channel.updateOverwrite(muteRoleId, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
				});
			});
			message.channel.send('The guild did not have a **Mute** role nor was it assigned to a different role');
			return message.channel.send(errEmbed);
		}
		catch (e) {
			console.log(e.stack);
		}
	}

	const member = message.mentions.members.first();
	if (!member) {return message.channel.send('Please mention a user or provide a valid user ID');}

	if (member === message.member) {return message.channel.send('You cannot mute yourself');}

	if (member === message.guild.me) return message.channel.send('You cannot mute me');

	if (member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send('You cannot mute someone with an equal or higher role');}

	if(member.roles.highest.position > message.guild.me.roles.highest.position) {return message.channel.send('My highest role is lower than the mentioned user\'s role');}

	if (!args[1]) {return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)\n`$mute @user 1m <reason>');}

	const time = ms(args[1]);
	if (!time || time > 1209600000) {
		return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)\n`.mute @user 1m <reason>`');
	}
	// Cap at 14 days, larger than 24.8 days causes integer overflow


	let reason = args.slice(2).join(' ');
	if (!reason) reason = '`Not Specified`';
	if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

	if (member.roles.cache.has(muteRoleId.id)) {return message.channel.send('Provided member is already muted');}

	// Mute member
	try {
		await member.roles.add(muteRoleId);
	}
	catch (err) {
		console.log(err);
		return message.channel.send(`Please check the role hierarchy\n${err.message}`);
	}

	const muteEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setDescription(`${member} has now been muted for **${ms(time, { long: true })}**.`)
		.addField('Moderator', message.member, true)
		.addField('Member', member, true)
		.addField('Time', `\`${ms(time)}\``, true)
		.addField('Reason', reason);
	message.channel.send(muteEmbed);

	// Unmute member
	member.timeout = message.client.setTimeout(async () => {
		try {
			await member.roles.remove(muteRoleId);
		}
		catch (err) {
			console.log(err);
			return message.channel.send('Please check the role hierarchy', err.message);
		}
	}, time);
};
module.exports.help = {
	aliases: ['moot'],
	name: 'mute',
	description: 'Change the guild\'s mute role',
	usage: 'mute @role <time> <reason>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 1000,
};