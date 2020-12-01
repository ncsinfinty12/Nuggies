/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const urban = require('urban');

module.exports.run = async (client, message, args, utils) => {

	const saymessage = args.join(' ');
	const trollface = urban(saymessage);
	trollface.first(function(json) {
		const m = new Discord.MessageEmbed()
			.setTitle(`defination for ${saymessage}`)
			.setDescription('**' + saymessage + '**: ' + json.definition + '\n\n' + json.example + '\n Go to ' + json.permalink + ' for more information')
			.setColor('RANDOM');
		try{message.channel.send(m);}
		catch(error) {message.channel.send('Word not found');}
	});
};


module.exports.help = {
	aliases: [],
	name: 'define',
	description: 'nein',
	usage: 'ping',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};