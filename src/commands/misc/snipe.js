/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const snipes = message.client.snipes.get(message.channel.id) || [];
	const msg = snipes[args[0] - 1 || 0];
	if (!msg) return message.channel.send('theres nothing to be sniped');
	const Embed = new MessageEmbed()
		.setColor('RANDOM')
		.setAuthor(
			msg.author.tag,
			msg.author.displayAvatarURL({ dynamic: true, size: 256 }),
		)
		.setDescription(msg.content)
		.setFooter(`Date: ${msg.date} | page ${args[0] || 1}/${snipes.length}`);
	if (msg.image) Embed.setImage(msg.image);
	message.channel.send(Embed);
};

module.exports.help = {
	aliases: ['sn'],
	name: 'snipe',
	description: 'see deleted msgs',
	usage: config.prefix + 'snipe',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};