/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8a2a215de8b64bbd91c65b743076c108');

module.exports.run = async (client, message, args, utils) => {

	newsapi.v2.topHeadlines({
		language: 'en',
	}).then(response => {
		const randomnews = response.articles [Math.floor(Math.random() * response.articles.length)];
		const image = randomnews.urlToImage;
		const embed = new Discord.MessageEmbed()
			.setURL(randomnews.url)
			.setTitle(randomnews.title)
			.setDescription(`**Summary:** ${randomnews.description} \n\n\n **Full:** ${randomnews.content}`)
			.setImage(image)
			.setTimestamp();
		message.channel.send(embed);
	});
};


module.exports.help = {
	aliases: [],
	name: 'news',
	description: 'Read News like a nerd 🤓',
	usage: config.prefix + 'news',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};