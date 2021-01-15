/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const acceptedReplies = ['rock', 'paper', 'scissors'];
	const random = Math.floor((Math.random() * acceptedReplies.length));
	const result = acceptedReplies[random];
	const embed = new Discord.MessageEmbed()
		.setTitle('Rock Paper Scissors')
		.setDescription('React with 🗿 for stone\nReact with 📄 for paper\nReact with ✂️ for scissor')
		.setThumbnail('https://www.esquireme.com/public/styles/full_img/public/images/2017/05/29/rock_paper_scissors__2x.png?itok=XyCX7Spl');
	message.channel.send(embed).then(m =>{
		m.react('🗿');
		m.react('📄');
		m.react('✂️');
		const filter = (reaction, user) => {
			return ['🗿', '📄', '✂️'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		m.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '🗿') {
					if (result === 'paper') return message.reply('I won! I chose ' + result);
					else return message.reply('You won! I chose ' + result);
				}
				if(reaction.emoji.name === '📄') {
					if (result === 'scissors') return message.reply('I won! I chose ' + result);
					else return message.reply('You won! I chose ' + result);
				}
				else if (result === 'rock') {return message.reply('I won! I chose ' + result);}
				else {return message.reply('You won! I chose ' + result);}
			},
			)
			.catch(collected => {
				message.reply('You know what is the use if you are just gonna waste my time 🦉');
			});
	});
};


module.exports.help = {
	aliases: [],
	name: 'rps',
	description: 'Play Rock Paper Scissor me (I am a pro 🤫)',
	usage: config.prefix + 'rps',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};