/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const { AME_API } = require('../../../utils/config.json');
const ameClient = require('amethyste-api');
const AmeAPI = new ameClient(AME_API);

module.exports.run = async (client, message, args, utils) => {
	const user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
	const m = await message.channel.send('<a:loadingonline:787905402603438100>');
	const buffer = await AmeAPI.generate('rip', { url: user.user.displayAvatarURL({ format: 'png', size: 512 }) });
	const attachment = new Discord.MessageAttachment(buffer, 'rip.png');
	m.delete({ timeout: 5000 });
	message.channel.send(attachment);
};

module.exports.help = {
	aliases: [],
	name: 'rip',
	description: 'rip all the legends 😩',
	usage: config.prefix + 'rip',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
};