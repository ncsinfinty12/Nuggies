/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to pat them');
	if (message.mentions.users.first().id === client.user.id) return message.channel.send('<:hnsFrogOwO:785174828969230388>');
	if (message.mentions.users.first().id == message.author.id) return message.reply('Idk if thats possible chief');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/poke')
		.catch(e => {
			if(e) {
				message.channel.send('Oops, something broke...');
				console.log(e);
			}
		});

	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.mentions.users.first().username}, you got poked by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('poke');
	message.channel.send({ embed });
};
module.exports.help = {
	aliases: [],
	name: 'poke',
	description: 'Poke people with this command',
	usage: config.prefix + 'poke @user',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,

};