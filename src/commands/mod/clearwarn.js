/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
const Discord = require('discord.js');
const warnings = require('../../../models/warningSchema');

module.exports.run = async (client, message, args) => {

	const returnEmbed = new Discord.MessageEmbed()
		.setDescription('Sad but you cannot clear your own warns! You tried.')
		.setColor('RANDOM');

	const perms = message.member.permissions;
	const hasKick = perms.has('KICK_MEMBERS');
	if(!hasKick) return message.channel.send('You are missing permissions to use this command!');
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if(!member) return message.channel.send('Can\'t seem to find this user!');

	if(member.id === message.author.id) return message.channel.send(returnEmbed);

	const GuildID = message.guild.id;
	const UserID = member.id;
	const userMention = member.user.tag;
	const errEmbed = new Discord.MessageEmbed()
		.setDescription(`There are no warns on the database for the user **${userMention}**`)
		.setColor('RED');

	const warnData = await warnings.findOne({
		UserID,
		GuildID,
	});

	if(!warnData) {
		return message.channel.send(errEmbed);
	}
	else {
		await warnings.deleteOne({
			UserID,
			GuildID,
		});
	}
	const successEmbed = new Discord.MessageEmbed()
		.setDescription(`Successfully cleared **${userMention}**'s warnings`)
		.setColor('GREEN');
	message.channel.send(successEmbed);
};

module.exports.help = {
	aliases: ['cw'],
	name: 'clearwarn',
	description: 'Clears all user warning!',
	usage: config.prefix + 'clearwarn @user',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Moderation',
	disable: false,
};
