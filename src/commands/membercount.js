const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
 const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .addField('Members', message.guild.memberCount, true)
    .setColor('BLUE')
    .setTimestamp()
    message.channel.send(embed).catch(err => {message.channel.send(':x: An error occured! ') + err})
};

module.exports.help = {
	aliases: ['members', 'memberscount'],
	name: 'membercount',
	description: 'Get guild membercount',
	usage: config.prefix + 'membercount',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};
