/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	if(!config.globalmods.includes(message.author.id) || !config.globalmods.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
	const target = await client.users.fetch(args[0]);

	if(!target) return utils.errorEmbed(message, ':warning: Invalid user.');

	const checkbl = await client.data.getUserDB(target.id);

	if(!checkbl.blacklisted) return message.reply(`That user isn't blacklisted!\nUser: ${target.username + '#' + target.discriminator}`);

	await client.data.blacklist(target.id, 'false', 'null');

	target.send("You have been whitelisted from using the bot!\n**Don't break the rules again!**");
	message.reply(
		`Whitelisted **${target.username + '#' + target.discriminator}**`,
	);
};


module.exports.help = {
	aliases: [],
	name: 'whitelist',
	description: 'Whitelist a person from the bot',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	restricted: false,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};