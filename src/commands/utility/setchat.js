/* eslint-disable no-unused-vars */
const { MessageEmbed, DiscordAPIError, Message } = require('discord.js');
const config = require('../../../utils/config.json');
const schema = require('../../../models/channelSchema');
module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission.');
	const channel = message.mentions.channels.first();
	schema.findOne({ _id : '6023f079f935032c19dd341a' }, (err, data) => {
		if(args[1] === 'true') {
			if(!channel) {
				const m = new MessageEmbed()
					.setColor('red')
					.addField('Error', 'Please mention a channel');
				message.channel.send(m);
				return;
			}
			if(data.channelID.includes(channel.id)) {
				return message.channel.send(new MessageEmbed()
					.setColor('red')
					.addField('Error', `Chat is already \`true\` in <#${channel.id}>`));
			}
			data.channelID.push(channel.id);
			const me = new MessageEmbed()
				.setColor('GREEN')
				.addField('Success', `setted chat to \`true\` in <#${channel.id}>`);
			message.channel.send(me);
			data.save();
		}
		else if (args[1] === 'false') {
			if(!channel) {
				const m = new MessageEmbed()
					.setColor('red')
					.addField('Error', 'Please mention a channel');
				message.channel.send(m);
				return;
			}
			if(!data.channelID.includes(channel.id)) {
				const n = new MessageEmbed()
					.setColor('red')
					.addField('Error', `chat is already \`false\` in <#${channel.id}>`);
				message.channel.send(n);
				return;
			}
			const index = data.channelID.indexOf(channel.id);
			data.channelID.splice(index, 1);
			data.save();
			const a = new MessageEmbed()
				.setColor('GREEN')
				.addField('Success', `chat successfully set to \`false\` in <#${channel.id}>`);
			message.channel.send(a);
		}
		else {
			const v = new MessageEmbed()
				.setColor('RED')
				.addField('Error', 'please follow the following format - .setchat <channel mention> true/false');
			message.channel.send(v);
		}

	});

};

module.exports.help = {
	aliases: [],
	name: 'setchat',
	description: 'enable chatbot in a channel !',
	usage: '.setchat <channel mention> true/false',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 10000,
};