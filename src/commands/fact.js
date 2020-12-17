/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const { body } = await superagent
		.get('https://nekos.life/api/v2/fact');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle('Here\'s your fact!')
		.setDescription(body.fact + '\n ...and that\'s a fact!')
		.setFooter(`Spitting faxx!`);
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
	disable: false,
};
