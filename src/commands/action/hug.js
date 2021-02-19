/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to hug them');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/hug');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got hugged by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('that hugss');
	message.channel.send({ embed });
};
module.exports.help = {
	aliases: [],
	name: 'hug',
	description: 'Hug someone',
	usage: config.prefix + 'hug @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};