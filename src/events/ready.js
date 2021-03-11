/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Discord = require('discord.js');
const automeme = require('../../models/guilds');
module.exports = async (client) => {

	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`to ${client.guilds.cache.size} servers!`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
	// await automeme.updateMany({ automeme_enabled: true }, { premium: false });
};