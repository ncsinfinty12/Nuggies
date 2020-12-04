/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const translate = require('@vitalets/google-translate-api');

module.exports.run = async (client, message, args, utils) => {

	const saymessage = args.join(' ');
	translate(saymessage, { to: 'en' }).then(res => {
		message.channel.send('**Translated text: **' + res.text + '\n**Translated from: **' + res.from.language.iso + '\n\n**Requested by: **' + message.author.username);
	}).catch(err => {
		console.error(err);
	});
};


module.exports.help = {
	aliases: [],
	name: 'translate',
	description: 'Translate stuff from different language to English',
	usage: config.prefix + 'translate hola',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};