/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to tickle them');

	if(message.mentions.users.first().id === '734006373343297557') return message.reply('AssassiN got tickled so much, that he already died. R.I.P.');

	if (message.mentions.users.first().id == client.user.id) return message.reply('Nuuuuuuuuuuuuuuuuuuuuuu that tickless');

	if (message.mentions.users.first().tag === message.author.tag) {
		message.reply('Lol, why are you tickling yourself :joy:');
		return;
	}
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/tickle');

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got tickled by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('that tickless');
	message.reply({ embed });

};
module.exports.help = {
	aliases: [],
	name: 'tickle',
	description: 'Tickle someone',
	usage: config.prefix + 'tickle',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};