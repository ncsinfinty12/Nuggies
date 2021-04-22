/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to bite them !');
	if (message.mentions.users.first().id == message.author.id) return message.reply('❌**Error**: You cant bite yourself!');
	axios.get('https://api.otakugifs.xyz/gif/bite', {
		headers: {
			'X-API-KEY': process.env.otakugifs,
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.mentions.users.first().username} ! You got bitten by ${message.author.username}`)
				.setFooter('Ouchieee !')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: [],
	name: 'bite',
	description: 'Bite someone !',
	usage: config.prefix + 'bite',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};