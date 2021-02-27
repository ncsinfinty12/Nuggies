/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission.');
	const channel = message.mentions.channels.first();
	if(args[1] === 'true') {
		if(!channel) {
			const m = new MessageEmbed()
				.setColor('RED')
				.addField('Error', 'Please mention a channel');
			message.channel.send(m);
			return;
		}
		if(data.guild.chatbot_channel == channel.id) {
			return message.channel.send(new MessageEmbed()
				.setColor('RED')
				.addField('Error', `chatbot is already \`true\` in <#${channel.id}>`));
		}
		await client.data.setchatbot_enabled(message.guild.id, 'true');
		await client.data.setchatbot_channel(message.guild.id, channel.id);
		const me = new MessageEmbed()
			.setColor('GREEN')
			.addField('Success', `chatbot set to \`true\` in <#${channel.id}>`);
		message.channel.send(me);
	}
	else if (args[1] === 'false') {
		if(!channel) {
			const m = new MessageEmbed()
				.setColor('RED')
				.addField('Error', 'Please mention a channel');
			message.channel.send(m);
			return;
		}
		if(data.guild.chatbot_channel !== channel.id) {
			const n = new MessageEmbed()
				.setColor('RED')
				.addField('Error', `chatbot is already \`false\` in <#${channel.id}>`);
			message.channel.send(n);
			return;
		}
		await client.data.setchatbot_enabled(message.guild.id, 'false');
		await client.data.setchatbot_channel(message.guild.id, 'null');
		const a = new MessageEmbed()
			.setColor('GREEN')
			.addField('Success', `chatbot successfully set to \`false\` in <#${channel.id}>`);
		message.channel.send(a);
	}
	else {
		const v = new MessageEmbed()
			.setColor('RED')
			.addField('Error', 'please follow the following format - .setchat <channel mention> true/false');
		message.channel.send(v);
	}

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