/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!args.join(' ')) {
		if(!message.channel.topic) {
			message.channel.topic = 'No channel topic is set for this channel';
		}
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(message.channel.name)
			.setThumbnail(message.guild.iconURL())
			.setDescription(`Here is some information about ${message.channel}`)
			.addFields(
				{
					name: '🗣  Channel Topic',
					value: `${message.channel.topic}`,
					inline: true,
				},
				{
					name:'🤷‍♂️  Type',
					value: `${message.channel.type}`,
					inline: true,
				},
				{
					name:'👪  Category',
					value: message.channel.parent,
					inline: true,
				},
				{
					name:'↕  Position',
					value: message.channel.position,
					inline: true,
				},
				{
					name:'🔞  NSFW',
					value: message.channel.nsfw,
					inline: true,
				},
				{
					name:'📅  Created At',
					value: message.channel.createdAt,
					inline: false,
				},
			);
		message.channel.send(embed);
	}
	else{
		let channel;
		if(args[0] && isNaN(args[0]) && message.mentions.channels.first()) channel = message.mentions.channels.first();
		if(args[0] && isNaN(args[0]) && !message.mentions.channels.first()) {
			channel = message.guild.channels.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim());

			if(!message.guild.channels.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim())) return message.reply(':x: channel not found');
		}
		if(args[0] && !isNaN(args[0])) {
			channel = message.guild.channels.cache.find(e => e.id == args[0]);
			if(!message.guild.channels.cache.has(args[0])) return message.reply(':x: Channel not found');
		}

		if(!channel) return message.reply('You must mention channel');
		if(!channel.topic) {
			channel.topic = 'No channel topic is set for this channel';
		}
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`Information about **${channel.name}**`)
			.setThumbnail(message.guild.iconURL())
			.setDescription(`Here is some information about ${channel}`)
			.addFields(
				{
					name: '🗣  Channel Topic',
					value: `${channel.topic}`,
					inline: true,
				},
				{
					name:'🤷‍♂️  Type',
					value: `${channel.type}`,
					inline: true,
				},
				{
					name:'👪  Category',
					value: channel.parent,
					inline: true,
				},
				{
					name:'↕  Position',
					value: channel.position,
					inline: true,
				},
				{
					name:'🔞  NSFW',
					value: channel.nsfw,
					inline: true,
				},
				{
					name:'📅  Created At',
					value: channel.createdAt,
					inline: false,
				},
			);
		message.channel.send(embed);
	}
};


module.exports.help = {
	aliases: ['channelinfo'],
	name: 'channel',
	description: 'Get info about channel channel',
	usage: config.prefix + 'channel',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};