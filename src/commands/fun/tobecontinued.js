/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const AME_API = process.env.AME_API;
const ameClient = require('amethyste-api');
const AmeAPI = new ameClient(AME_API);

module.exports.run = async (client, message, args, utils) => {
	const user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
	const m = await message.channel.send('<a:loadingonline:787905402603438100>');
	const buffer = await AmeAPI.generate('tobecontinued', { url: user.user.displayAvatarURL({ format: 'png', size: 512 }) });
	const attachment = new Discord.MessageAttachment(buffer, 'tobecontinued.png');
	m.delete({ timeout: 5000 });
	message.channel.send(attachment);
};

module.exports.help = {
	aliases: ['tbc'],
	name: 'tobecontinued',
	description: 'Sends a to be continued image...',
	usage: config.prefix + 'tobecontinued <@555064829946232832>',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'Fun',
	disable: false,
	cooldown: 5000,
};