/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const { body } = await superagent
		.get('http://api.nekos.fun:8080/api/cry');
	const m = new Discord.MessageEmbed()
		.setTitle(`${message.author.username} is crying ! 😦`)
		.setImage(body.image)
		.setFooter('😭')
		.setColor('RANDOM');
	message.channel.send(m);

};

module.exports.help = {
	aliases: [],
	name: 'cry',
	description: 'cry 😭😭😭',
	usage: config.prefix + 'cry',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};