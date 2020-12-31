/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `KICK MEMBERS ` permission !');

	if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
	let reason = args.slice(1).join(' ');
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
	if (user.id === message.author.id) return message.reply('I can\'t let you do that, self-harm is bad:facepalm:');
	if (user.id === client.user.id) return message.reply('You pleblord, how can you use a bot to kick itself?:joy:');

	if (message.mentions.users.first().id === '242263403001937920') return message.reply('You can\'t kick my Developer:wink:');
	if (reason.length < 1) reason = 'No reason supplied';

	if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');

	const embed = new Discord.MessageEmbed()
		.setColor(0x0000FF)
		.setTimestamp()
		.addField('Action:', 'Kick')
		.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
		.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
		.addField('Reason', reason)
		.setFooter('Yeeted them outta here')
		.setThumbnail('https://media.tenor.co/videos/cac50685b4c1a7bb4e82bc53ec4b1612/mp4');

	if(user.bot) return;
	message.mentions.users.first().send({ embed }).catch(e =>{
		if(e) return;
	});
	message.guild.member(user).kick();
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'kick',
	description: 'Kick people from your server (it\'s fun)',
	usage: config.prefix + 'kick',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
	disable: false,
};