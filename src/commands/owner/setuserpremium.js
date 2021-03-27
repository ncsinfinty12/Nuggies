/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const users = require('../../../models/users');
module.exports.run = async (client, message, args, utils, data) => {
	const target = args[0];
	const toggle = args[1];
	let tier = args[2];
	await client.users.fetch(target);
	if(!tier) tier = 0;
	if(!target) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a user!').setColor('RED'));
	if(!toggle) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a toggle!').setColor('RED'));
	// if(toggle != 'true' || 'false') return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a valid toggle!'));
	users.findOne({ id: args[0] }, async (err, Data) => {
		if(err) throw err;
		if(!Data) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('user not found').setColor('RED'));
		Data.premium = toggle;
		Data.tier = tier;
		Data.save();
		message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium \`tier ${tier}\` set to \`${toggle.toLowerCase()}\` for **${client.users.cache.get(target).tag}** `).setColor('GREEN'));
	});
};
module.exports.help = {
	aliases: ['setuserp', 'userp'],
	name: 'setuserpremium',
	description: 'set a user premium',
	usage: '.setuserpremium <ID> <toggle> <tier>',
};

module.exports.config = {
	developers: true,
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 0,
};