/* eslint-disable no-unused-vars */
const { premiumUser, getUserDB } = require('../../../functions/mongo');
const config = require('../../../utils/config.json');
const Discord = require('discord.js');
const users = require('../../../models/users');
module.exports.run = async (client, message, args, utils, data) => {
	if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setColor('RED').setDescription('Please provide a user.'));
	const target = message.mentions.users.first() || client.users.cache.get(args[0]);
	if(!target) return message.channel.send('user doesnt exist');
	if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setColor('RED').setDescription('Please provide a toggle.'));
	const toggle = args[1];
	try {
		premiumUser(target.id, toggle);
		return message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`${toggle}\` for **${target.tag}**! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));
	}
	catch (e) {
		message.channel.send(e);
	}
};
module.exports.help = {
	aliases: ['setuserp', 'userp'],
	name: 'setuserpremium',
	description: 'set a user premium',
	usage: '.setuserpremium <ID> <toggle>',
};

module.exports.config = {
	developers: true,
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 0,
};