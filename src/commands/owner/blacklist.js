/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, [target, ...args], utils, data) => {
	if(!config.globalmods.includes(message.author.id) || !config.globalmods.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
	target = await client.users.fetch(target);

	if(!target) return utils.errorEmbed(message, ':warning: Invalid user.');

	const checkbl = await client.data.getUserDB(target.id);

	if(checkbl.blacklisted) return message.reply(`That user is already blacklisted!\nUser: ${target.username + '#' + target.discriminator}\nReason: \`${checkbl.blacklisted_reason}\``);

	let reason = args.join(' ');
	if(!reason) reason = 'Not specified';

	const blacklist = await client.data.blacklist(target.id, 'true', reason);

	target.send(`You have been blacklisted from using the bot! \n **Reason:** ${reason}\n **Moderator:** ${message.author.tag} \n**Join Nuggies Support to appeal:** https://discord.gg/ut7PxgNdef`);
	message.reply(
		`Blacklisted **${target.username + '#' + target.discriminator}**\n` +
			`Reason: \`${blacklist.reason}\``, +`Moderator: \`${message.author.tag}\``,
	);
	message.delete();
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