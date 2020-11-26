/* eslint-disable no-unused-vars */
module.exports.run = async (client, message, args, utils) => {
	if (!client.lockit) client.lockit = [];
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');

	message.channel.createOverwrite(message.guild.id, {
		SEND_MESSAGES: true,
	});
	message.channel.send(`**${message.author.username}** just unlocked the channel !`);
};

module.exports.help = {
	aliases: ['unlockdown'],
	name: 'unlock',
	description: 'nein',
	usage: 'unlock',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};