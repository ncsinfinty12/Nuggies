/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `BAN MEMBERS ` permission !');
	if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
	let reason = args.slice(1).join(' ');
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
	if (message.mentions.users.first().id === message.author.id) return message.reply('I can\'t let you do that, I dont promote self-harm');
	if (user.id === client.user.id) return message.reply('You dumbass, how will I ban myself ?');
	if (message.mentions.users.first().id === '734006373343297557') return message.reply('You can\'t ban my Developer :wink:');
	if (reason.length < 1) reason = 'No reason supplied.';
	const botRolePossition = message.guild.member(client.user).roles.highest.position;
	const rolePosition = message.guild.member(user).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.reply('❌**Error:** Cannot ban that member because they have roles that is higher or equal to you.');
	if (botRolePossition <= rolePosition) return message.reply('❌**Error:** Cannot ban that member because they have roles that is higher or equal to me.');
	if (!message.guild.member(user).bannable) {
		message.reply(':redTick: I cannot ban that member. My role might not be high enough or it\'s an internal error.');
		return;
	}
	else{
		const embed = new Discord.MessageEmbed()
			.setColor('BLACK')
			.setTimestamp()
			.addField('Action:', 'Ban')
			.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
			.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
			.addField('Reason', reason)
			.setThumbnail('https://media1.tenor.com/images/6a61251f5453d93d76f9826be10b7f49/tenor.gif?itemid=7580925');
		// let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
		if(user.bot) return message.reply('The user is a bot ! I cant do that to my own race :pensive:');
		message.mentions.users.first().send({ embed }).catch(e =>{
			console.log(e);
		});
		message.guild.members.ban(user.id, { reason: reason });

		message.channel.send({ embed });
		if(user.bot) return;
		message.mentions.users.first().send({ embed }).catch(e =>{
			if(e) return;
		});
	}
};


module.exports.help = {
	aliases: [],
	name: 'ban',
	description: 'Ban a person from your server',
	usage: config.prefix + 'ban @user',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
	disable: false,
	cooldown: 500,
};