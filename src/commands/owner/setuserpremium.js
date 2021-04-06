/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const users = require('../../../models/users');
module.exports.run = async (client, message, args, utils, data) => {
	const target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));
	if(!target) return message.channel.send('bruh fartpoop poop specify a user');
	const tier = args[1];
	await client.users.fetch(target.id);
	if(!target) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a user!').setColor('RED'));
	// if(toggle != 'true' || 'false') return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a valid toggle!'));
	users.findOne({ id: target.id }, async (err, Data) => {
		if(err) throw err;
		if(!Data) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('user not found').setColor('RED'));
		Data.tier = tier;
		Data.save();
		message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`tier ${tier}\` for **${client.users.cache.get(target.id).tag}** `).setColor('GREEN'));
		client.channels.cache.get('828996803855777882').send(new Discord.MessageEmbed().setTitle(`Premium tier ${tier} added to ${target.user.username}`).setColor('GREEN'));
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