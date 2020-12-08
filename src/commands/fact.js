/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/fact');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle('And That\'s a Fact')
		.setDescription(body.fact)
		.setFooter('fact fact fact fact fact fact fact fact fact fact fact fact fact fact fact fact fact fact');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'fact',
	description: 'just facts',
	usage: config.prefix + 'fact',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};