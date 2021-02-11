/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `BAN MEMBERS ` permission !');

	if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
	const user = args[0];
	let reason = args.slice(1).join(' ');
	if (reason.length < 1) reason = 'No reason supplied.';
	if (!user) return message.reply('You must supply a user ID').catch(console.error);
	message.guild.members.unban(user, reason).catch(e =>{
		if(e) {
			return message.reply(`${client.users.cache.get(`${args[0]}`).username} isn't banned, atleast not for now :eyes:`);
		}
	}).then(() =>{
		const embed = new Discord.MessageEmbed()
			.setColor(0xFF0000)
			.setTimestamp()
			.addField('Action:', 'Unban')
			.addField('User:', `${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator} (${user})`)
			.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
			.addField('Reason', reason)
			.setFooter('aww man :(');
		message.channel.send({ embed });
	});
};

module.exports.help = {
	aliases: ['unyeet'],
	name: 'unban',
	description: 'unban a user',
	usage: '.unban <userID> <reason>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 500,
};