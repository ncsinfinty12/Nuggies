/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args, utils) => {
	const afkreason = args.join(' ') || 'AFK';
	await client.data.setAfk(message.author.id, afkreason);
	message.channel.send(Discord.Util.removeMentions(`You are now afk for: **\`${afkreason}\`**`));
};


module.exports.help = {
	aliases: [],
	name: 'afk',
	description: 'afk...',
	usage: '.afk listning to juice wrld',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
};