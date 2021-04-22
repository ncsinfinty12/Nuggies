/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	const channel = message.member.voice.channel;
	if(!channel) return message.channel.send('please connect to a voice channel to use soundboard');
	channel.join().then(connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audio/lessgoo.mp3'));
		message.react('🔊');
		dispatcher.on('speaking', speaking => {
			if(!speaking) channel.leave();
		});
	}).catch(err => console.log(err));
};

module.exports.help = {
	aliases: ['dababy'],
	name: 'lessgoo',
	description: 'make a "lessgoo" sound',
	usage: '.lessgoo',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	cooldown: 5000,
	disable: false,
};