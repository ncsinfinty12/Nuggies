/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const userDB = require('../../../models/users');
const guildDB = require('../../../models/guilds');
const { premium } = require('../../../functions/mongo');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	// check if the server is already premium or not
	if(data.user.premium == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already premium!').setColor('RED'));
	// dev check
	if(config.developers.includes(message.author.id)) {
		premium(message.guild.id, true);
		return message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`true\` in ${message.guild.name}! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));
	}
	// premium user check
	if(data.user.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://goo.gl/CWqeBF) to donate!').setColor('RED'));
	// changing boolean value
	if(data.user.premium == true) {
		premium(message.guild.id, true);
		message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`true\` in ${message.guild.name}! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));
	}
};

module.exports.help = {
	aliases: ['psadd', 'premiumserveradd'],
	name: 'premiumserver',
	description: 'add premium to your server!',
	usage: '.psadd',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 10000,
};