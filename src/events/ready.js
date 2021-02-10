const mongoose = require('mongoose');
const Discord = require('discord.js');
const schema = require('../../models/channelSchema');
module.exports = async (client) => {

	console.log(`${client.user.username} is now online!`);
	client.user.setActivity('Nuggies.tech', { type: 'WATCHING' });

};