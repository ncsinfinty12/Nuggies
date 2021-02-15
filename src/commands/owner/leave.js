/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	let id = args[0];
	if (!id) id = message.guild.id;
	const lguild = client.guilds.cache.get(id);
	lguild.leave()
		.then(g => console.log(`Left ${g}`));
};

module.exports.help = {
	aliases: [],
	name: 'leave',
	description: 'Just leave',
	usage: config.prefix + 'leave',
};

module.exports.config = {
	args: false,
	developers: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};