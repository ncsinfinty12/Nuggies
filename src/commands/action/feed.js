/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to feed them :3');
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<:hnsFrogOwO:785174828969230388>');
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('I see you\'re lonely,.. ***feeds you***');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/feed');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got a feed from ${message.author.username}!`)
		.setImage(body.url)
		.setFooter('you look cute :)');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'feed',
	description: 'feed someone 🤤',
	usage: config.prefix + 'feed @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};