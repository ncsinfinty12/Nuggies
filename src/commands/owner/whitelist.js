/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	if(!config.globalmods.includes(message.author.id) || !config.globalmods.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
	const target = await client.users.fetch(args[0]);

	if(!target) return utils.errorEmbed(message, ':warning: Invalid user.');

	const checkbl = await client.data.getUserDB(target.id);
	const channel = client.channels.cache.get(`809317042058035241`);

	if(!checkbl.blacklisted) return message.reply(`That user isn't blacklisted!\nUser: ${target.username + '#' + target.discriminator}`);

	await client.data.blacklist(target.id, 'false', 'null');
	const logEmbed = new Discord.MessageEmbed()
		.setTitle(`<a:9689_tick:785181267758809120> User Whitelisted`)
		.setDescription(`**${target.username}#${target.discriminator}** was whitelisted for using the bot.\n\nResponsible Moderator : **${message.author.username}**`)
		.setFooter(`Blacklist deleted`)
		.setColor(`WHITE`)
		.setTimestamp();


	channel.send(logEmbed);
	target.send(`**You have been whitelisted from using the bot!**\n \n Moderator: ${message.author.tag} **Don't break the rules again!** \n Join Nuggies Support: https://discord.gg/ut7PxgNdef`).catch(err => {
		message.channel.send(`${target.username} has DM's disabled. I was unable to send him a message - but blacklist has been registered!`);
		console.log(err);
	});

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