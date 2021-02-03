/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args, utils) => {
	const guild = client.guilds.cache.find(g => g.name === args.join(' ')) || client.guilds.cache.get(args[0]);
	if(!guild) {
		const mewhennoguild = new Discord.MessageEmbed()
			.setTitle('⚠ You just hit a bruh moment ⚠')
			.setColor('RANDOM')
			.setDescription('Please give me a valid server 🤦‍♂️');
		return message.channel.send(mewhennoguild);
	}
	try {
		const tChannel = guild.channels.cache.find(ch => ch.type == 'text' && ch.permissionsFor(ch.guild.me).has('CREATE_INSTANT_INVITE'));
		if(!tChannel) {
			const error = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription('There aint any text channel i can create an invite in 😦 or some other err ocured :/');
			return message.channel.send(error);
		}
		const invite = await tChannel.createInvite({ temporary: false, maxAge: 0 });
		message.channel.send(invite.url);
	}
	catch(err) {
		const error1 = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription('There was an err doing that. Heres the err: ```' + err + '\n```');
		return message.channel.send(error1);
	}
};
module.exports.help = {
	aliases: [],
	name: 'getinvite',
	description: 'Just need an invite alright',
	usage: 'getinvite',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'owner',
	disable: false,
};