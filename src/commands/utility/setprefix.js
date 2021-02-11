/* eslint-disable no-unused-vars */
const prefixModel = require('../../../models/prefixSchema');

module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You need the ``manage server`` permission to run this command !');

	const data = await prefixModel.findOne({
		GuildID: message.guild.id,
	});

	if (!args[0]) return message.reply('Please provide a new prefix !');

	if (args[0].length > 5) return message.channel.send('Your new prefix must be under ``5`` characters!');

	if (data) {
		await prefixModel.findOneAndRemove({
			GuildID: message.guild.id,
		});

		message.channel.send(`The new prefix is **\`${args[0]}\`**`);

		const newData = new prefixModel({
			Prefix: args[0],
			GuildID: message.guild.id,
		});
		newData.save();
	}
	else if (!data) {
		message.channel.send(`The new prefix is **\`${args[0]}\`**`);

		const newData = new prefixModel({
			Prefix: args[0],
			GuildID: message.guild.id,
		});
		newData.save();
	}

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