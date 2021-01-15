/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	function roll(maxnumber) {
		return Math.floor(Math.random() * maxnumber);
	}
	if(!args.join(' ')) {
		const embed = new Discord.MessageEmbed()
			.setTitle('Rolling 0 - 6')
			.setDescription(`Rolled Number: ${roll(6)}`)
			.setColor('RANDOM')
			.setThumbnail('https://media4.giphy.com/media/3oGRFlpAW4sIHA02NW/source.gif');
		message.channel.send(embed);
	}
	if(!isNaN(args.join(' ')) && args.join(' ')) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`Rolling 0 - ${args.join(' ')}`)
			.setDescription(`Rolled Number: ${roll(args.join(' '))}`)
			.setColor('RANDOM')
			.setThumbnail('https://media4.giphy.com/media/3oGRFlpAW4sIHA02NW/source.gif');
		message.channel.send(embed);
	}
	if(isNaN(args.join(' '))) {
		message.channel.send(`Gimme a number, not ${args.join(' ')}`);
	}
};


module.exports.help = {
	aliases: [],
	name: 'roll',
	description: 'Rolls a number below the one you want',
	usage: config.prefix + 'roll 69',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};