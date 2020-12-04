/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

const blacklist = require('../../models/blacklistSchema');
module.exports.run = async (client, message, args, utils) => {
	if(!config.globalmods.includes(message.author.id)) return;
	const User = args[0].slice(1);
	blacklist.findOne({ id : User }, async (err, data) => {
		if(err) throw err;
		if(data) {
			message.channel.send('user is already blacklisted!');
		}
		else {
			data = new blacklist({ id : User });
			data.save()
				.catch(err => console.log(err));
			client.users.cache.get(args[0]).send('You have been blacklisted from using the bot!');
			message.channel.send('blacklisted user.');
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'blacklist',
	description: 'Blacklist a person from the bot',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'moderation',
};