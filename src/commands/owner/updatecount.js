/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	try {
		const fetch = require('node-fetch');
		fetch(`https://voidbots.net/api/auth/stats/${client.user.id}`, {
			method: 'POST',
			headers: {
				Authorization: 'qEznrQ8k75kEWu3HCSuhG9AtEYKAZUeZeLUvtExNwoUh',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 'server_count': client.guilds.cache.size }),
		}).then(response => response.text())
			.then(console.log).catch(console.error);
	}
	catch (e) {
		message.channel.send(e);

	}
};

module.exports.help = {
	aliases: [],
	name: 'count',
	description: 's *something*',
	usage: config.prefix + 'count',
};

module.exports.config = {
	args: false,
	developers: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};