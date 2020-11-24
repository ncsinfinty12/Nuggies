/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to kiss them :3');
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
	if (message.mentions.users.first().id === message.author.id) return message.channel.send('I see you\'re lonely,.. ***kisss you***');
	const { body } = await superagent
		.get('https://nekos.life/api/kiss');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle(`${message.mentions.users.first().username}, you got a kiss from ${message.author.username}!`)
		.setImage(body.url)
		.setFooter('kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss kiss');
	message.channel.send({ embed });
};


module.exports.help = {
	aliases: [],
	name: 'kiss',
	description: 'nein',
	usage: 'suggest',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
};