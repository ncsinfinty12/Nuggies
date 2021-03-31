/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, utils, data) => {
	if(message.guild.id !== '780334622164254720') return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('This command can only be used in our [__**support server**__](https://discord.gg/d98jT3mgxf)').setColor('RED'));
	if(data.user.premium == false) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	if(message.member.roles.cache.has('784277493515419659')) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('You already have the <@&784277493515419659> role!').setColor('RED'));
	try {
		message.member.roles.add('784277493515419659');
	}
	catch (e) {
		message.channel.send(`Error \n \`\`\`${e}\`\`\``);
	}
	message.channel.send(new MessageEmbed().setTitle('Success!').setDescription('gave you the <@&784277493515419659> role!').setFooter('Thanks for donating! :)').setColor('GREEN'));
};

module.exports.help = {
	aliases: ['roleclaim'],
	name: 'rclaim',
	description: 'claim your supporter role :)',
	usage: '.rclaim',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60 * 12,
};