/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	axios.get('https://api.otakugifs.xyz/gif/mad', {
		headers: {
			'X-API-KEY': 'pLsoTHg2vHBKpB4CNeGnVysCP60645uW8fFRRbgT7AIvkyHbBgE3IsgNBS3rUuD8321l23GHAT8GfbE4K4c9T0qH9P2',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username} is mad ! 💢`)
				.setFooter('😡')
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
	name: 'mad',
	description: 'get mad !',
	usage: config.prefix + 'mad',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
	disable: false,
};