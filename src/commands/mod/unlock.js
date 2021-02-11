/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `MANAGE CHANNELS ` permission !');

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
	description: 'Locked the channel? Unlock with this command',
	usage: config.prefix + 'unlock',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 1000,
};