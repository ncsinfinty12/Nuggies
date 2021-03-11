/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const superagent = require('superagent');

module.exports.run = async (client, message, args, utils) => {
	superagent('https://api.themoviedb.org/3/trending/all/day?api_key=65773cfbab93a4b947736543e8dd740c').then(body => {
		const items = body.body.results;
		const random = items[Math.floor(Math.random() * items.length)];
		const embed = new Discord.MessageEmbed()
			.setAuthor('Trending Movies', message.author.displayAvatarURL())
			.setTitle(random.original_title || random.name || random.original_name)
			.setDescription(random.overview)
			.addField('Score', random.vote_average, true)
			.addField('Vote Count', random.vote_count, true)
			.addField('Original Language', random.original_language)
			.addField('Release Date', random.first_air_date || random.release_date)
			.setImage(`https://image.tmdb.org/t/p/w500${random.poster_path}` || `https://image.tmdb.org/t/p/w500${random.backdrop_path}`);
		message.channel.send(embed);
	}).catch(err => message.channel.send(err));
};


module.exports.help = {
	aliases: [],
	name: 'recommend',
	description: 'Get some movie recommendations',
	usage: config.prefix + 'recommend',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};