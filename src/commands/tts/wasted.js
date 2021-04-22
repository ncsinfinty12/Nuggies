/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	const channel = message.member.voice.channel;
	if(!channel) return message.channel.send('please connect to a voice channel to use soundboard');
	channel.join().then(connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audio/wasted.mp3'));
		dispatcher.on('speaking', speaking => {
			message.react('🔊');
			if(!speaking) channel.leave();
		});
	}).catch(err => console.log(err));
};

module.exports.help = {
	aliases: [],
	name: 'wasted',
	description: 'gtav wasted sound',
	usage: '.wasted',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	disable: false,
	cooldown: 5000,
};