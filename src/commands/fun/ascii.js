/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const figlet = require('figlet');

module.exports.run = async (client, message, args, utils) => {
	if (!args[0]) return message.channel.send('Please provide some text');

	const message2 = args.join(' ');
	figlet(message2, function(err, data) {
		if (err) {
			console.log(data);
			console.dir(err);
		}

		message.channel.send('```' + data + '```');
	});
};


module.exports.help = {
	aliases: [],
	name: 'ascii',
	description: 'Turn text into ascii',
	usage: config.prefix + 'ascii',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
	cooldown: 1000,
};