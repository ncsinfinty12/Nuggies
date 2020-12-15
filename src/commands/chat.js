/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const query = args.join('%20');
	const { body } = await superagent
		.get(`https://cb.totallyusefulapi.ml/${query}`);
	if(body.profanity === 'true') {
		message.reply('Please don\'t swear !').then(m => {
			m.delete({ timeout: 5000 });
		});
		return;
	}
	message.reply(`${body.reply}`);
};

module.exports.help = {
	aliases: ['nugget'],
	name: 'chat',
	description: 'chat with the bot',
	usage: config.prefix + 'chat',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: true,
};