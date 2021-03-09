/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Discord = require('discord.js');
const automeme = require('../../models/guilds');
const axios = require('axios');
module.exports = async (client) => {

	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`to ${client.guilds.cache.size} servers!`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
	automeme.find({ automeme_enabled: true }, async (err, data) => {
		setTimeout(async function() {
			const memeChannel = data.automeme_channel;
			axios.get('https://api.nuggies.tech/api/meme')
				.then(function(response) {
					const embed = new Discord.MessageEmbed()
						.setTitle(`${response.data.title}`)
						.setURL(`${response.data.url}`)
						.setImage(response.data.image)
						.setColor('RANDOM')
						.setFooter(`👍 ${response.data.upvotes} 👎 ${response.data.downvotes} 💬 ${response.data.comments}`);
					for (let i = 0; i < Infinity; i++) {
						client.channels.cache.get(data[i].automeme_channel).send(embed);
						// if(data.length >= i) i = 0 - 1;
					}
				});
		}, 2000);
	});
};