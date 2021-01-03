/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const { body } = await superagent
		.get('http://api.nekos.fun:8080/api/wink');
	const m = new Discord.MessageEmbed()
		.setTitle(`${message.author.username} is winking !`)
		.setImage(body.image)
		.setFooter('😉')
		.setColor('RANDOM');
	message.channel.send(m);

};

module.exports.help = {
	aliases: [],
	name: 'wink',
	description: 'wink',
	usage: config.prefix + 'wink',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};