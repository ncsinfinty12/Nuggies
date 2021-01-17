/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {

	(async () => {
		const body = await superagent('https://meme-api.herokuapp.com/gimme');
		const embed = new Discord.MessageEmbed()
			.setColor(0xab4aff)
			.setTitle(body.body.title)
			.setImage(body.body.url)
			.setURL(body.body.postLink);
		message.channel.send(embed);
	})();
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
	category: 'misc',
	disable: false,
};