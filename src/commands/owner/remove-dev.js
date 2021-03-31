/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const staff = require('../../../models/nuggiesStaff');

module.exports.run = async (client, message, args) => {
	const target =
    message.mentions.members.first() ||
    message.guild.members.cache.find((m) =>m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));
	const GuildID = '780334622164254720';

	const nuggiesStaff = await staff.findOne({
		_id: GuildID,
	});

	if (!nuggiesStaff.Developers.includes(target.id)) {
		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(':warning: Error')
				.setDescription('This user doesn\'t have developer permissions')
				.setColor('RED'),
		);
	}
	else {
		const arr = nuggiesStaff.Developers;

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === target.id) {
				arr.splice(i, 1);
			}
		}

		await staff.findOneAndUpdate({
			_id: GuildID,
			Developers: arr,
		});

		message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('<a:9689_tick:785181267758809120> Success!')
				.setDescription(
					`Successfully revoked **<@${target.id}>'s** developer permissions`,
				)
				.setColor('GREEN'),
		);
		message.guild.members.cache
			.get(target.id)
			.send(
				new Discord.MessageEmbed()
					.setTitle(':warning: Alert')
					.setDescription(
						`Your developer permissions for **Nuggies** were revoked by **${message.author.tag}**`,
					)
					.setColor('RED'),
			);
	}
};

module.exports.help = {
	aliases: ['r-d'],
	name: 'remove-dev',
	description: 'Remove a developer from the permissions array',
	usage: config.prefix + 'remove-dev <id>',
};

module.exports.config = {
	developers: true,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 2000,
};
