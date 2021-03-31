/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const userDB = require('../../../models/users');
const guildDB = require('../../../models/guilds');
const { premiumGuild, pushguild } = require('../../../functions/mongo');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	if(data.user.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	// check if the server is already premium or not
	if(data.guild.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already non premium!').setColor('RED'));
	if(!data.user.premiumservers.includes(message.guild.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setTitle('Error').setDescription('you are not the person who made this guild premium, please contact them to remove premium.'));
	try {
		await premiumGuild(message.guild.id, 'false');
		await pushguild(message.author.id, message.guild.id, 'splice');
	}
	catch (e) {
		message.channel.send(`error:\`\`\`${e}\`\`\``);
	}
	message.channel.send(new Discord.MessageEmbed().setTitle('Success').setDescription(`Removed premium from **${message.guild.name}**`).setColor('GREEN'));
};

module.exports.help = {
	aliases: ['psrid', 'premove', 'pre', 'psremove'],
	name: 'premiumserverremove',
	description: 'add premium to your server!',
	usage: '.psremove',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60 * 12,
};