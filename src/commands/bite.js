/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to bite them !');
	if (message.mentions.users.first().id == client.user.id) return message.channel.send('You cant bite yourself !');
	axios.get('https://api.otakugifs.xyz/gif/bite', {
		headers: {
			'X-API-KEY': 'pLsoTHg2vHBKpB4CNeGnVysCP60645uW8fFRRbgT7AIvkyHbBgE3IsgNBS3rUuD8321l23GHAT8GfbE4K4c9T0qH9P2',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.mentions.users.first().username} ! You got bitten by ${message.author.username}`)
				.setFooter('Ouchieee !')
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
	args: true,
	restricted: false,
	category: 'moderation',
	disable: false,
};