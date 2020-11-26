/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	let reason = args.slice(1).join(' ');
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them.').catch(console.error);
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('I can\'t let you do that, I dont promote self-harm');
	if (user.id === client.user.id) return message.channel.send('You dumbass, how will I ban myself ?');
	if (message.mentions.users.first().id === '734006373343297557') return message.channel.send('You can\'t ban my Developer :wink:');
	if (reason.length < 1) reason = 'No reason supplied.';
	const botRolePossition = message.guild.member(client.user).roles.highest.position;
	const rolePosition = message.guild.member(user).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send('❌**Error:** Cannor ban that member because they have roles that is higher or equal to you.');
	if (botRolePossition <= rolePosition) return message.channel.send('❌**Error:** Cannor ban that member because they have roles that is higher or equal to me.');
	if (!message.guild.member(user).bannable) {
		message.channel.send(':redTick: I cannot ban that member. My role might not be high enough or it\'s an internal error.');
		return;
	}
	else{
		const embed = new Discord.MessageEmbed()
			.setColor('BLACK')
			.setTimestamp()
			.addField('Action:', 'Ban')
			.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
			.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
			.addField('Reason', reason);
		// let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
		if(user.bot) return;
		message.mentions.users.first().send({ embed }).catch(e =>{
			if(e) return;
		});
		message.guild.members.ban(user.id, { days:7, reason: reason });

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
	description: 'nein',
	usage: 'ban',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
};