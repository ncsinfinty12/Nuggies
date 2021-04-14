/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { getUserDB } = require('../../../functions/mongo');
module.exports.run = async (client, message, args, utils, data) => {
	const target = args[0];
	if(!target) return message.channel.send('please provide a user id to ayo.');
	client.users.fetch(args[0]);
	const gettier = await getUserDB(target);
	let tier = 0;
	if(gettier.tier == 1) tier = 3;
	if(gettier.tier == 2) tier = 5;
	if(gettier.tier == 3) tier = 5;
	if(gettier.tier == 4) tier = 3;
	if(gettier.tier == 5) tier = 'unlimited';
	client.users.cache.get(target).send(new Discord.MessageEmbed().setTitle('Thank you for Supporting us!').setColor('GREEN').setDescription(`I have added **premium tier ${gettier.tier}** to you! You can add **Nuggies Premium to ${tier} servers!** \n \n Join [this server](https://discord.gg/d98jT3mgxf) to get a special role!`).setFooter('you also get automeme, big pp in .pp command less cooldowns!').setThumbnail(client.users.cache.get(target).displayAvatarURL({ dynamic:true })));
	message.channel.send('successfully ayo\'d that person');
};

module.exports.help = {
	aliases: [],
	name: 'ayo',
	description: 'ayo a person',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	developers: true,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};