/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const superagent = require('superagent');

module.exports.run = async (client, message, args, utils) => {

	const pronouns = ['silly', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];
	if (!args.join(' ')) return message.channel.send(`${randompronoun}, gimme something to search`);
	const toSearch = args.join(' ');
	superagent(`https://api.themoviedb.org/3/search/movie?api_key=65773cfbab93a4b947736543e8dd740c&language=en-US&query=${toSearch}`).then(body => {
		const items = body.body.results;
		const random = items[0];
		if(!random) return message.channel.send('couldnt find a person with that name!');
		const embed = new Discord.MessageEmbed()
			.setTitle(random.original_title || random.name || random.original_name)
			.setDescription(random.overview)
			.addField('Score', random.vote_average, true)
			.addField('Vote Count', random.vote_count, true)
			.addField('Original Language', random.original_language)
			.addField('Release Date', random.first_air_date || random.release_date)
			.setImage(`https://image.tmdb.org/t/p/w500${random.poster_path}` || `https://image.tmdb.org/t/p/w500${random.backdrop_path}`);
		message.channel.send(embed);
	}).catch(err => message.channel.send('Movie not found'));
};


module.exports.help = {
	aliases: [],
	name: 'movie',
	description: 'See bot\'s ping',
	usage: config.prefix + 'ping',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};