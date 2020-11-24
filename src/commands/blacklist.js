/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const bl = '../../blacklist.json';
module.exports.run = async (client, message, args, utils) => {
	if (!message.author.id === '734006373343297557') return message.reply('You don\'t have the permission to use this command...:facepalm:');
	// message.delete();
	const blacklist = JSON.parse(fs.readFileSync(bl, 'utf8'));
	const user = args[0];
	const amount = parseInt(user);

	if (isNaN(amount)) {
		return message.reply('Please enter a valid UserID');
	}
	if (!user) return message.reply('You need to input a User ID');
	if (args[0] === '242263403001937920') return message.reply('You can\'t blacklist yourself, Dev:joy: That would be horrible.');

	if (!blacklist[user]) {
		blacklist[user] = {
			id: user,
			state: true,
		};
		message.reply(`<@${user}> is now Blacklisted!`);
		fs.writeFile(bl, JSON.stringify(blacklist), err => {
			if(err) throw err;
		});

		client.guilds.forEach((guild) => {
			if(guild.ownerID === user) {
				message.guild.leave(guild.id);
			}
		});

		return;
	}
	if (blacklist[user].state === true) {
		message.reply('That user have already been blacklisted');
		return;
	}

};


module.exports.help = {
	aliases: [],
	name: 'blacklist',
	description: 'nein',
	usage: 'clear',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'moderation',
};