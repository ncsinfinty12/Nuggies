/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	axios.get('https://api.nuggies.tech/api/meme')
		.then(function(response) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`${response.data.title}`)
				.setURL(`${response.data.url}`)
				.setImage(response.data.image)
				.setColor('RANDOM')
				.setFooter(`👍 ${response.data.upvotes} 👎 ${response.data.downvotes} 💬 ${response.data.comments}`);
			message.channel.send(embed);
		});
};


module.exports.help = {
	aliases: [],
	name: 'meme',
	description: 'Wanna see some meme? Just use the command',
	usage: config.prefix + 'meme',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Fun',
	disable: false,
	cooldown: 1000,
};