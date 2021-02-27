/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to slap them');
	if(message.mentions.users.first().id === '734006373343297557') return message.reply('You can\'t hurt him you dumbass.');
	if (message.mentions.users.first().id == client.user.id && message.author.id === '734006373343297557') {
		const { body } = await superagent
			.get('https://nekos.life/api/v2/img/slap');

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`No u! *slaps*  ${message.mentions.users.first().username}`)
			.setImage(body.url)
			.setFooter('that hurts');
		return message.channel.send({ embed });
	}
	else if (message.mentions.users.first().id == client.user.id && message.author.id !== '734006373343297557') {
		return message.channel.send('NUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU **owwie**');
	}
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/slap');

	const embed = new Discord.MessageEmbed()
		.setColor('#ff9900')
		.setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('feels good ?');
	message.channel.send({ embed });
};

module.exports.help = {
	aliases: [],
	name: 'slap',
	description: 'Slap someone ✋',
	usage: config.prefix + 'slap @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};