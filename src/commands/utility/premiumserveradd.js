/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const userDB = require('../../../models/users');
const guildDB = require('../../../models/guilds');
const { premiumGuild, pushguild } = require('../../../functions/mongo');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils, data) => {
	if(data.user.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	// check if the server is already premium or not
	if(data.guild.premium == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already premium!').setColor('RED'));
	if(data.user.tier == 1 && data.user.premiumservers.length == 3 || data.user.tier == 2 && data.user.premiumservers.length == 5 || data.user.tier == 3 && data.user.premiumservers.length == 7 || data.user.tier == 4 && data.premiumservers.length == 2) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('You cannot add premium to any guilds. Please remove premium from a guild to add it!').setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setColor('RED'));
	// making the guild premium.
	try {
		await premiumGuild(message.guild.id, 'true');
		await pushguild(message.author.id, message.guild.id, 'push');
	}
	catch (e) {
		console.log(e);
		return message.channel.send(`command failed \`\`\`${e}\`\`\``);
	}
	message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium added to **${message.guild.name}**! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));

};

module.exports.help = {
	aliases: ['psadd', 'padd', 'premiumserver'],
	name: 'premiumserveradd',
	description: 'add premium to your server!',
	usage: '.psadd',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};