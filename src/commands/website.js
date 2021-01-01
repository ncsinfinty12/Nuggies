/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const query = args.join(' ');
	const something = encodeURIComponent(query);
	const { body } = await superagent
		.get(`https://meta.totallyusefulapi.ml?url=${something}`);
	if (body.error === 'Invalid url query.') return message.channel.send('Website has no meta tags.');
	const embed = new Discord.MessageEmbed()
		.setTitle(body.title)
		.setDescription(body.description)
		.setThumbnail(body.icon)
		.setColor('BLUE');
	message.reply(embed);
};

module.exports.help = {
	aliases: ['web'],
	name: 'website',
	description: 'get info from a website',
	usage: config.prefix + 'website',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};
