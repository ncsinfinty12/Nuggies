/* eslint-disable no-unused-vars */
const afkSchema = require('../../../models/afkSchema');

module.exports.run = async (client, message, args, utils) => {
	const afkreason = args.join(' ') || 'AFK';
	const newData = new afkSchema({
		id: message.author.id,
		GuildID: message.guild.id,
		reason: afkreason,
	});
	newData.save();
	message.channel.send(`You are now afk for: **\`${afkreason}\`**`);
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
	category: 'misc',
	disable: false,
};