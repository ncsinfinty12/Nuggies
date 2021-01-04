/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	let choices = args.join(' ');
	choices = choices.split('|');
	const pronouns = ['silly', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];
	if(!choices) return message.channel.send(`${randompronoun}, you have to split choices with | , \n\n Example: \`\`\`.choose small | big \`\`\``);
	const randomchoice = choices[Math.floor(Math.random() * choices.length)];
	const embed = new Discord.MessageEmbed()
		.setTitle(`You should go with "${randomchoice}"`)
		.setColor('RANDOM')
		.setAuthor(message.author.username, message.author.avatarURL());
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'choose',
	description: 'See bot\'s choose',
	usage: config.prefix + 'choose',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};