/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const oneLinerJoke = require('one-liner-joke');

module.exports.run = async (client, message, args, utils) => {

	const getRandomJoke = oneLinerJoke.getRandomJoke();
	let tags = getRandomJoke.tags;
	tags = tags.toString();
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('RANDOM JOKES FOR YOU')
		.setDescription(`${getRandomJoke.body} \n\nTags:${tags}`)
		.setFooter(`Requested by ${message.author.username}`);
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'ping',
	description: 'nein',
	usage: 'ping',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};