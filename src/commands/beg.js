/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const coins = require('discord-mongo-currency');
const fetch = require('node-fetch');
module.exports.run = async (client, message, args, utils) => {
	const user = await coins.findUser(message.author.id, config.guild);
	const names = ['Shrek', 'AssassiN', 'pro_gamer', 'AR', 'chika', 'Lin Chan', 'Escargoat', 'mariah carey', 'bill gates', 'Masie', 'IYA', 'Gav', 'Yurikko', 'Santa', 'rich jews', 'Rick Astley'];
	const randomnames = names[Math.floor(Math.random() * names.length)];
	const line = ['gave you', 'donated', 'threw at you'];
	const randomline = line[Math.floor(Math.random() * line.length)];
	fetch('https://voidbots.net/api/auth/voted/779741162465525790', { headers: { 'voter': `${message.author.id}` } }).then(res => res.json()).then(data => {
		if(data.voted == true) {
			const ranVote = Math.floor(Math.random() * 300) + 1;
			coins.giveCoins(message.author.id, config.guild, ranVote);
			const m = new Discord.MessageEmbed()
				.setTitle(`${randomnames} ${randomline} ${ranVote} nuggets !`)
				.setDescription(`You now have ${user.coinsInWallet + ranVote} <a:Nugget:792335999778684948>'s`)
				.setFooter('Thank you for voting ! you now get x2 nuggets')
				.setColor('RANDOM')
				.setThumbnail('https://media.discordapp.net/attachments/783289401165873182/792996933006131221/unknown.png');
			message.channel.send(m);
			return;
		}
		if (data.voted == false) {
			const randomnon = Math.floor(Math.random() * 150) + 1;
			coins.giveCoins(message.author.id, config.guild, randomnon);
			const newbal = coins.findUser(message.author.id, config.guild);
			const n = new Discord.MessageEmbed()
				.setTitle(`${randomnames} ${randomline} ${randomnon} nuggets !`)
				.setDescription(`You now have ${user.coinsInWallet + randomnon} <a:Nugget:792335999778684948>'s`)
				.setFooter('did you knew that you get x2 nuggets for voting ?')
				.setColor('RANDOM')
				.setThumbnail('https://media.discordapp.net/attachments/783289401165873182/792996933006131221/unknown.png');
			message.channel.send(n);
			return;
		}
	}).catch(console.error);
};

module.exports.help = {
	aliases: [],
	name: 'beg',
	description: 'Blacklist a person from the bot',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
	disable: false,
};