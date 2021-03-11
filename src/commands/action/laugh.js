/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const { body } = await superagent
		.get('http://api.nekos.fun:8080/api/laugh');
	const m = new Discord.MessageEmbed()
		.setTitle(`${message.author.username} is laughing !`)
		.setImage(body.image)
		.setFooter('HaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa')
		.setColor('RANDOM');
	message.channel.send(m);

};

module.exports.help = {
	aliases: [],
	name: 'laugh',
	description: 'laugh 😂',
	usage: config.prefix + 'laugh',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};