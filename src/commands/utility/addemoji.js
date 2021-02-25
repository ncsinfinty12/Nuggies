/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { parse } = require('superagent');

module.exports.run = async (client, message, args, utils, data) => {
	if(!args.length) return message.reply('please give some emojis to add!');

	for(const rawEmoji of args) {
		const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

		if(parsedEmoji.id) {
			const extension = parsedEmoji.animated ? '.gif' : '.png';
			const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
			message.guild.emojis.create(url, parsedEmoji.name)
				.then((emoji) => {message.channel.send(`Added: ${emoji.url}`);});
		}
	}
};

module.exports.help = {
	aliases: ['stealemoji'],
	name: 'steal',
	description: 'steal an emoji',
	usage: '.steal <emoji>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
};