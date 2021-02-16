/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const blacklist = require('../../../models/blacklistSchema');
module.exports.run = async (client, message, args, utils) => {
	if(!config.globalmods.includes(message.author.id) || !config.globalmods.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
	const User = args[0];

	blacklist.findOne({ id : User }, async (err, data) => {
		if(err) throw err;

		if(data) {
			message.reply('User is already blacklisted!');
		}
		else {
			data = new blacklist({ id : User });
			data.save()
				.catch(err => console.log(err));
			const target = client.users.cache.get(args[0]);
			target.send('You have been blacklisted from using the bot! \n \n **Join Nuggies Support to appeal:** https://discord.gg/ut7PxgNdef');
			message.reply(`Blacklisted **${target.username + '#' + target.discriminator}**`);
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
	restricted: false,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};