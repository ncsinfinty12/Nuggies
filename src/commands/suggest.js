/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const suggestion = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setColor(0xff75c6)
		.setTitle('Suggestion from ' + message.author.username)
		.setThumbnail('https://previews.123rf.com/images/carmenbobo/carmenbobo1405/carmenbobo140500366/28338205-stamp-with-word-suggest-inside-vector-illustration.jpg')
		.setDescription('**' + suggestion + '**\n\n\n ')
		.setFooter('if you want to suggest something, use ' + config.prefix + 'suggest <suggestion>');
	message.channel.send(embed).then(sentMessage => {
		sentMessage.react('👍');
		sentMessage.react('👎');
		message.delete();
	});
};


module.exports.help = {
	aliases: [],
	name: 'suggest',
	description: 'nein',
	usage: 'suggest',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};