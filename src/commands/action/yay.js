/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	axios.get('https://api.otakugifs.xyz/gif/yay', {
		headers: {
			'X-API-KEY': 'FrDrFYi5XFr7dijUh6uhMcTnc0r5MeAIrHp2waZo8FWrk3LuRzvYgbmrVW4Z04pFgzcXf2x5yxJUJ7DDslmDqb',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username} is excited !`)
				.setFooter('YaAAaaAAaAaAAaAYYYYY')
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
	name: 'yay',
	description: 'yay',
	usage: config.prefix + 'yay',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
	disable: false,
	cooldown: 1000,
};