/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const userDB = require('../../../models/users');
const guildDB = require('../../../models/guilds');
const { premiumGuild, pushguild } = require('../../../functions/mongo');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	// check if the server is already premium or not
	if(data.guild.premium == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already premium!').setColor('RED'));
	// premium user check
	if(data.user.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://goo.gl/CWqeBF) to donate!').setColor('RED'));

	if(data.guild.premium == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already premium!').setColor('RED'));
	if(data.user.tier == 1 && data.user.premiumservers.length == 1 || data.user.tier == 2 && data.user.premiumservers.length == 3 || data.user.tier == 3 && data.user.premiumservers.length == 5 || data.user.tier == 4 && data.premiumservers.length == 2) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('You cannot add premium to any guilds. Please remove premium from a guild to add it!').setColor('RED'));
	// making the guild premium.
	try {
		premiumGuild(message.guild.id, true);
		pushguild(message.author.id, message.guild.id);
	}
	catch (e) {
		console.log(e);
		return message.channel.send(`command failed \`\`\`${e}\`\`\``);
	}
	message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`true\` in ${message.guild.name}! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));

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
	cooldown: 1000 * 60 * 12,
};