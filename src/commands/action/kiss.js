/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to kiss them :3');
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<:hnsFrogOwO:785174828969230388>');
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('I see you\'re lonely,.. ***kisss you***');
	const { body } = await superagent
		.get('https://nekos.life/api/kiss');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got a kiss from ${message.author.username}!`)
		.setImage(body.url)
		.setFooter('kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'kiss',
	description: 'Kiss someone 💋',
	usage: config.prefix + 'kiss @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};