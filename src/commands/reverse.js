/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const texttoreverse = args.join(' ');
	const pronouns = ['silly', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];
	if(!texttoreverse) return message.channel.send(`${randompronoun}, Gimme something to reverse`);
	const reversed = texttoreverse.split('').reverse().join('');
	const embed = new Discord.MessageEmbed()
		.setTitle(`Reversed text: ${reversed}`)
		.setColor('RANDOM')
		.setAuthor(message.author.username, message.author.avatarURL());
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'reverse',
	description: 'See bot\'s reverse',
	usage: config.prefix + 'reverse',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};