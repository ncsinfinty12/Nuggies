/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const axios = require('axios');
module.exports.run = async (client, message, args, utils) => {
	axios.get('https://monke.vip/api/images/monkey')
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username}, here is your monke pic !`)
				.setFooter('🐵🐒')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: ['monkey'],
	name: 'monke',
	description: 'Wanna see some meme? Just use the command',
	usage: config.prefix + 'meme',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
	cooldown: 1000,
};