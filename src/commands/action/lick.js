/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to <a:Lick:792041050670891028> them');
	if (message.mentions.users.first().id === client.user.id) {
		message.channel.send('<:cringepepe:792042297884803072>');
		message.channel.send('why me ?');
		return;
	}
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('You licked yourself :open_mouth:');
	const { body } = await superagent
		.get('http://api.nekos.fun:8080/api/lick');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got licked by ${message.author.username}!`)
		.setImage(body.image)
		.setFooter('yum yum 😋');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'lick',
	description: 'lick someone 👅',
	usage: config.prefix + 'lick @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};