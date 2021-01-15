/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const axios = require('axios');

module.exports.run = async (client, message, args, utils) => {
	const m = await message.channel.send('<a:loadingonline:787905402603438100> Trying to get a response from https://nuggies.tech/api/gay');
	axios.get('https://nuggies.tech/api/gay')
		.then(function(response) {
			message.channel.send(JSON.stringify(response.data.gay, null, 2));
			m.delete({ timeout: 5000 });
		})
		.catch(function(error) {
			message.channel.send(error);
		});
};

module.exports.help = {
	aliases: [],
	name: 'gay',
	description: 'its just gay man',
	usage: config.prefix + 'gay',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
};