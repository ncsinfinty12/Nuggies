/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args, utils) => {
	const text = args.join(' ');

	if (!text) {
		return message.channel.send('**Enter Text**');
	}

	const m = await message.channel.send('<a:loadingonline:787905402603438100>');
	try {
		const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
		const json = await res.json();
		const attachment = new Discord.MessageAttachment(json.message, 'clyde.png');
		message.channel.send(attachment);
		m.delete({ timeout: 5000 });
	}
	catch (e) {
		m.edit(e.message);
	}
};

module.exports.help = {
	aliases: [],
	name: 'clyde',
	description: 'send a msg as clyde',
	usage: config.prefix + 'clyde',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 5000,
};