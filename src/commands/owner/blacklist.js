/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

const blacklist = require('../../../models/blacklistSchema');
module.exports.run = async (client, message, args, utils) => {
	if(!config.globalmods.includes(message.author.id)) return;
	if(!args) return message.channel.send('Please provide a user ID to blacklist !');
	const User = args[0];
	blacklist.findOne({ id : User }, async (err, data) => {
		if(err) throw err;
		if(data) {
			message.reply('user is already blacklisted!');
		}
		else {
			data = new blacklist({ id : User });
			data.save()
				.catch(err => console.log(err));
			const target = client.users.cache.get(args[0]);
			target.send('You have been blacklisted from using the bot! \n \n **join this server to appeal:** https://discord.gg/ut7PxgNdef');
			message.reply(`blacklisted **${target.username + '#' + target.discriminator}**`);
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
	restricted: true,
	args: true,
	category: 'moderation',
	disable: false,
};