/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to hug them');
	if(message.mentions.users.first().id === '734006373343297557') return message.reply('You can\'t hug him. He will explode on impact!');
	if (message.mentions.users.first().id == client.user.id) return message.channel.send('Nuuuuuuuuuuuuuuuuuuuuuu that hugss');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/hug');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle(`${message.mentions.users.first().username}, you got huged by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('that hugss');
	message.channel.send({ embed });
};
module.exports.help = {
	aliases: [],
	name: 'hug',
	description: 'nein',
	usage: 'hug',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'misc',
};