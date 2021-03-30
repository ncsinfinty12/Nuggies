/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Discord = require('discord.js');
const automeme = require('../../models/guilds');
const config = require('../../utils/config.json');
module.exports = async (client) => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`to ${client.guilds.cache.size} servers!`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
	const Webhook = new Discord.WebhookClient(config.restarthookID, config.restarthookTOKEN);
	const restartEmbed = new Discord.MessageEmbed()
		.setTitle('Nuggies was restarted!')
		.setDescription('Nuggies just got restarted!')
		.setColor('e03854')
		.setFooter(client.user.id)
		.setTimestamp();
	Webhook.send(restartEmbed);
	// await automeme.updateMany({ automeme_enabled: true }, { premium: false });
};