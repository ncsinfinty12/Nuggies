/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const wikihow = require('how-to-what');

module.exports.run = async (client, message, args, utils) => {
	if(!args.join(' ')) return message.channel.send('Baka, Tell me what you want to learn to do');
	const howto = args.join(' ');
	wikihow.howTo(howto)
		.then(hows =>{
			const embed = new Discord.MessageEmbed()
				.setTitle(`Steps for ${howto}`)
				.setDescription(hows);
			message.channel.send(embed);
		})
		.catch(m => message.channel.send('Idk how to do that, figure it on your own'));
};


module.exports.help = {
	aliases: [],
	name: 'howto',
	description: 'See bot\'s howto',
	usage: config.prefix + 'howto ',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};