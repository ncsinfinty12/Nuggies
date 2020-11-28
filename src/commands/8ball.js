/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const pronouns = ['silly', 'senpai', 'daddy', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];
	const question = args.join(' ');
	if(!question) return message.channel.send(`${randompronoun}, ask a question 🥺`);
	const answer = ['nu', 'yus', 'yes', 'no', 'never', 'of course', 'hell yeah', 'hell no', 'negative', 'positive', 'not today', 'only today', 'sadly yes', 'sadly no', 'maybe', 'you bet', 'not a chance', 'it\'s a secret', 'only for today'];
	const randomanswer = answer[Math.floor(Math.random() * (answer.length - 1 + 1) + 1)];
	const embed = new Discord.MessageEmbed()
		.setTitle(question)
		.setDescription(`${randompronoun}, ${randomanswer}`);
	message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: '8ball',
	description: 'nein',
	usage: '8ball',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};