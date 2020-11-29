/* eslint-disable no-unused-vars */
module.exports.run = async (client, message, args, utils) => {
	let id = args[0];
	if (!id) id = message.guild.id;
	client.guilds.get(id).leave()
		.then(g => console.log(`Left ${g}`));
};

module.exports.help = {
	aliases: [],
	name: 'leave',
	description: 'nein',
	usage: 'suggest',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'misc',
};