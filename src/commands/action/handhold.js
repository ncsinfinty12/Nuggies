/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to hold!');
	if (message.mentions.users.first().id == message.author.id) return message.reply('wow you holded your hands! congraatsss');
	axios.get('https://api.otakugifs.xyz/gif/handhold', {
		headers: {
			'X-API-KEY': process.env.otakugifs,
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.mentions.users.first().username} ! ${message.author.username} is holding your hand !`)
				.setFooter('so cutee')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: ['handhold', 'holdhand', 'handholding', 'holdhands'],
	name: 'holdhands',
	description: 'punch someone !',
	usage: config.prefix + 'punch',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};