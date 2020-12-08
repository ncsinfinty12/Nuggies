/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const guild1 = client.guilds.cache.get('780334622164254720');
	const channel1 = guild1.channels.cache.get('783955997403643914');
	const suggestion = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setColor(0xff75c6)
		.setTitle('Reported by ' + message.author.username)
		.setDescription('**' + suggestion + '**\n\n\n ')
		.setFooter('if you want to suggest something, use ' + config.prefix + 'suggest <suggestion>');
	message.channel.send('bug report submitted. Join discord.gg/zzURhQGpRY to view your report !');
	channel1.send(embed);
	message.delete();
};


module.exports.help = {
	aliases: [],
	name: 'bug',
	description: 'submit a bug report !',
	usage: config.prefix + '.bug kick command kicks the bot',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};