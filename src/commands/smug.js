/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/smug');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle(`${message.mentions.users.first().username}, you got a smug from ${message.author.username}!`)
		.setImage(body.url)
		.setFooter('smug smug smug smug smug smug smug smug smug smug smug smug smug smug smug smug smug smug');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'smug',
	description: 'just smug',
	usage: config.prefix + 'smug',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};