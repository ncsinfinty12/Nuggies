const mapping = {
	' ': '   ',
	'0': ':zero:',
	'1': ':one:',
	'2': ':two:',
	'3': ':three:',
	'4': ':four:',
	'5': ':five:',
	'6': ':six:',
	'7': ':seven:',
	'8': ':eight:',
	'9': ':nine:',
	'!': ':grey_exclamation:',
	'?': ':grey_question:',
	'#': ':hash:',
	'*': ':asterisk:',
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
	mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const figlet = require('figlet');

module.exports.run = async (client, message, args, utils) => {
	if (args.length < 1) {
		message.channel.send('You must provide some text to emojify!');
	}

	message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(''));

};


module.exports.help = {
	aliases: [''],
	name: 'emojify',
	description: 'Emojify text',
	usage: config.prefix + 'emojify',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};