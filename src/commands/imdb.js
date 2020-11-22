/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    const saymessage = args.join(" ");
            movie(saymessage, data => {
                const embed = new discord.MessageEmbed()
                    .setDescription("**Date released:** "+ data.Released + "\n**Runtime**: "+ data.Runtime + "\n**Genre:** "+data.Genre+"\n**Plot:** "+ data.Plot+"\n**Actors:** "+ data.Actors+ "\n**Awards Received:**: "+ data.Awards )
                    .setThumbnail(data.Poster)
                    .setTitle(data.Title)
                message.channel.send(embed);})
};


module.exports.help = {
	aliases: [],
	name: 'imdb',
	description: 'nein',
	usage: 'imdb',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};