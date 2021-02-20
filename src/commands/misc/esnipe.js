/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const esnipes = client.esnipes.get(message.channel.id) || [];
	const msg = esnipes[args[0] - 1 || 0];
	if (!msg) return message.channel.send('theres nothing to be sniped');
	const Embed = new MessageEmbed()
		.setColor('RANDOM')
		.setAuthor(
			msg.author.tag,
			msg.author.displayAvatarURL({ dynamic: true, size: 256 }),
		)
		.addField('Before', msg.oldContent, false)
		.addField('After', msg.newContent, false)
		.setFooter(`at ${msg.date} | page ${args[0] || 1}/${esnipes.length}`);
	if (msg.attachment) Embed.setImage(msg.attachment);
	message.channel.send(Embed);
};

module.exports.help = {
	aliases: ['esn'],
	name: 'esnipe',
	description: 'see the content of what the msg was before edited',
	usage: config.prefix + 'esnipe',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'More',
	disable: false,
	cooldown: 2000,
};