/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = (client, message, args, utils) => {
	const acceptedReplies = ['rock', 'paper', 'scissors'];
	const random = Math.floor((Math.random() * acceptedReplies.length));
	const result = acceptedReplies[random];

	const choice = args[0];
	if (!choice) return message.channel.send(`How to play: \`${config.prefix}rps <rock|paper|scissors>\``);
	if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
	if (result === choice) return message.reply('It\'s a tie! We had the same choice.');

	switch (choice) {
	case 'rock': {
		if (result === 'paper') return message.reply('I won!');
		else return message.reply('You won!');
	}
	case 'paper': {
		if (result === 'scissors') return message.reply('I won!');
		else return message.reply('You won!');
	}
	case 'scissors': {
		if (result === 'rock') return message.reply('I won!');
		else return message.reply('You won!');
	}
	default: {
		return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
	}
	}
};


module.exports.help = {
	aliases: [],
	name: 'rps',
	description: 'nein',
	usage: 'rps',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};