/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const discordTTS = require('discord-tts');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	const channel = message.member.voice.channel;
	if(!args) return message.channel.send('Please provide something to convert to TTS!');
	if(!channel) return message.channel.send('please connect to a voice channel to use TTS.');
	const broadcast = client.voice.createBroadcast();
	channel.join().then(connection => {
		broadcast.play(discordTTS.getVoiceStream(`${args.join(' ')}`));
		const dispatcher = connection.play(broadcast);
		message.react('🔊');
		dispatcher.on('speaking', speaking => {
			if(!speaking) channel.leave();
		});
	}).catch(err => console.log(err));
};

module.exports.help = {
	aliases: ['texttospeech'],
	name: 'tts',
	description: 'make an oof sound',
	usage: '.oof',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	cooldown: 1000,
	disable: false,
};