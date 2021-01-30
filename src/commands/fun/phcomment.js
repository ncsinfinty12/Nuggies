/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const fetch = require('node-fetch');
module.exports.run = async (client, message, args, utils) => {
	let user = await message.mentions.members.first();
	let text = args.join(' ');
	let pfp = ('a');
	let name = ('b');

	if(user) {
		text = args.slice(1).join(' ');
		pfp = (user.user.displayAvatarURL({ format: 'png', size: 512 }));
		name = user.user.username;
	}
	else {
		user = message.author;
		pfp = user.displayAvatarURL({ format: 'png', size: 512 });
		name = user.username;
	}

	if(!text) {
		return message.channel.send('**Enter Text!**');
	}

	const m = await message.channel.send('<a:loadingonline:787905402603438100>');
	try {
		const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${name}&image=${pfp}&text=${text}`));
		const json = await res.json();
		const attachment = new Discord.MessageAttachment(json.message, 'phcomment.png');
		message.channel.send(attachment);
		m.delete({ timeout: 5000 });
	}
	catch(e) {
		m.edit('❌**Error:** ' + e);
	}
};
module.exports.help = {
	aliases: ['phc'],
	name: 'phcomment',
	description: 'Send a comment on the hub :sunglasses: *fake*',
	usage: config.prefix + 'phcomment',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 5000,
};