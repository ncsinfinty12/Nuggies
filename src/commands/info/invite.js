/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const b = new Discord.MessageEmbed()
		.setTitle('Invite Nuggies !')
		.addField('Bot invite', '[click here](https://discord.com/oauth2/authorize?client_id=779741162465525790&permissions=1609952503&scope=bot%20applications.commands)', true)
		.addField('server invite', '[click here](https://discord.gg/zzURhQGpRY)', true)
		.addField('Invite pwetzel ', '[click here](https://discord.com/api/oauth2/authorize?client_id=723112579584491571&permissions=1812331632&scope=bot)', true)
		.setColor('RANDOM')
		.setFooter('thanks for inviting the bot !');
	message.channel.send(b);
};

module.exports.help = {
	aliases: [],
	name: 'invite',
	description: 'invite the bot to your server !',
	usage: '.invite',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 0,
};