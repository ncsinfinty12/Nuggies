/* eslint-disable no-unused-vars */

module.exports.run = async (client, message, args, utils, data) => {
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You need the ``manage server`` permission to run this command !');

	if (!args[0]) return message.reply('Please provide a new prefix !');

	if (args[0].length > 5) return message.channel.send('Your new prefix must be under ``5`` characters!');

	await client.data.setPrefix(message.guild.id, args[0]);

	message.channel.send(`The new prefix is **\`${args[0]}\`**`);

};

module.exports.help = {
	aliases: ['prefixset'],
	name: 'setprefix',
	description: 'change the bot\'s prefix to something',
	usage: '.setprefix !',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 10000,
};