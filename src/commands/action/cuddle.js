/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to cuddle them');
	if (message.mentions.users.first().id == client.user.id && message.author.id !== '242263403001937920') return message.channel.send('Aww! *cuddles you* ');
	if (message.mentions.users.first().id == client.user.id && message.author.id == '242263403001937920') return message.reply('>///< *cuddles dev-san*');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/cuddle');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.author.username} cuddled ${message.mentions.users.first().username} OwO`)
		.setImage(body.url)
		.setFooter('cuddles uwu');
	message.channel.send({ embed });
};

module.exports.help = {
	aliases: [],
	name: 'cuddle',
	description: 'Cuddle someone',
	usage: config.prefix + 'cuddle @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};