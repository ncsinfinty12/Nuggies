/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const movie = require('node-movie');

module.exports.run = async (client, message, args, utils) => {
	const saymessage = args.join(' ');
	movie(saymessage, data => {
		const embed = new Discord.MessageEmbed()
			.setDescription('**Date released:** ' + data.Released + '\n**Runtime**: ' + data.Runtime + '\n**Genre:** ' + data.Genre + '\n**Plot:** ' + data.Plot + '\n**Actors:** ' + data.Actors + '\n**Awards Received:**: ' + data.Awards)
			.setThumbnail(data.Poster)
			.setTitle(data.Title);
		message.channel.send(embed).catch(e =>{
			if(e) {
				return message.reply('couldnt find that movie !');
			}
		});
	});
};


module.exports.help = {
	aliases: ['movie', 'show'],
	name: 'imdb',
	description: 'Want information about movies? We got you covered',
	usage: config.prefix + 'imdb Avengers Endgame',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};