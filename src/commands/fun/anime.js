/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const malScraper = require('mal-scraper');

module.exports.run = async (client, message, args, utils) => {
	const pronouns = ['silly', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];
	if(!args.join(' ')) return message.channel.send(`${randompronoun}, gimme something to search`);
	const anime = args.join(' ');
	malScraper.getInfoFromName(anime)
		.then((data) => {
			const embed = new Discord.MessageEmbed()
				.setTitle(`**${data.englishTitle}** (${data.japaneseTitle})`)
				.setURL(data.url)
				.setImage(data.picture)
				.setDescription(data.synopsis)
				.addField('Score', data.score, true)
				.addField('Ranked', data.ranked, true)
				.addField('Popularity', data.popularity, true)
				.addField('Rating', data.rating, true)
				.addField('Genres', data.genres, true)
				.addField('Episodes', data.episodes, true)
				.addField('Duration', data.duration, true)
				.addField('Aired', data.aired, true)
				.addField('Status', data.status, true);
			message.channel.send(embed);
		})
		.catch((err) => message.channel.send('Can\'t find anime named that'));
};


module.exports.help = {
	aliases: [],
	name: 'anime',
	description: 'Get info about any anime',
	usage: config.prefix + 'anime shingeki no kyojin',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};