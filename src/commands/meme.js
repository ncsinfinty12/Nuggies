/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    async () => {
        const body = await superagent("https://meme-api.herokuapp.com/gimme")
        const embed = new discord.MessageEmbed()
            .setColor(0xab4aff)
            .setTitle(body.body.title)
            .setImage(body.body.url)
            .setURL(body.body.postLink)
        message.channel.send(embed);
      }
};


module.exports.help = {
	aliases: [],
	name: 'meme',
	description: 'nein',
	usage: 'meme',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};