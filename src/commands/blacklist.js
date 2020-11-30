/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const blacklist = require('../../models/blacklistSchema');
module.exports.run = async (client, message, args, utils) => {
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
			message.channel.send('blacklisted user.');
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'blacklist',
	description: 'nein',
	usage: 'clear',
};

module.exports.config = {
	args: true,
	restricted: true,
	category: 'moderation',
};