/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to pat them :3');
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<:hnsFrogOwO:785174828969230388>');
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('I see you\'re lonely,.. ***pats you***');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/pat');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got a pat from ${message.author.username}!`)
		.setImage(body.url)
		.setFooter('pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'pat',
	description: 'pat someone',
	usage: config.prefix + 'pat @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};