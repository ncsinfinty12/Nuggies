/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(args[0] == 'test') {
		// Check message send ping.
		const sendStart = Date.now();
		const reply = await message.channel.send('Checking ping... `​message.edit`​');
		const sendPing = Date.now() - sendStart;

		// Check message edit ping.
		const editStart = Date.now();
		await reply.edit('Checking ping... `​message.delete`​');
		const editPing = Date.now() - editStart;

		// Check message react ping.
		reply.edit('Checking ping... `​message.react`​');
		const reactStart = Date.now();
		await reply.react('✅');
		const reactPing = Date.now() - reactStart;

		// Check message delete ping.
		const deleteStart = Date.now();
		await reply.delete();
		const deletePing = Date.now() - deleteStart;

		// Send the results in an embed.
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Test complete!', message.author.avatarURL())
			.setDescription(`**Message Send Latency:** ${sendPing} ms\n\
**Message Edit Latency:** ${editPing} ms\n\
**Message React Latency:** ${reactPing} ms\n\
**Message Delete Latency:** ${deletePing} ms\n\
**Total Latency:** ${sendPing + editPing + reactPing + deletePing} ms\n`);
		return message.channel.send(embed);
	}
	else{
		const m = await message.channel.send('🏓 Pinging....');
		const dataPing = Date.now();
		await client.data.getGuildDB(message.guild.id);
		const dataPingNow = Date.now();
		const dataRealPing = dataPingNow - dataPing;
		const embed = new Discord.MessageEmbed()
			.setAuthor('🏓Pong!', message.author.avatarURL())
			.addFields(
				{ name: 'API Latency', value: Math.round(client.ws.ping) + 'ms', inline: true },
				{ name: 'Message Latency', value: m.createdTimestamp - message.createdTimestamp + 'ms', inline: true },
				{ name: 'Database Latency', value: dataRealPing + 'ms', inline: false },
			)
			.setFooter('Commands Loaded: ' + client.commands.size)
			.setColor('RANDOM');
		return m.delete(), message.channel.send(embed);
	}
};


module.exports.help = {
	aliases: [],
	name: 'ping',
	description: 'See bot\'s ping',
	usage: config.prefix + 'ping',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};