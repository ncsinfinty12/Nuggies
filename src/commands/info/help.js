/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
// const help = require('../../../data/helpmessages.json');
const config = require('../../../utils/config.json');
const PrefiX = require('../../../models/prefixSchema');


module.exports.help = {
	aliases: ['halp'],
	name: 'help',
	description: 'You can\'t be helped 😔',
	usage: config.prefix + 'help',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};


module.exports.run = async (client, message, args, utils) => {
	let prefix = ('a');
	const Data = await PrefiX.findOne({ GuildID: message.guild.id });
	if (Data) {
		prefix = Data.Prefix;
	}
	if (!Data) {
		prefix = config.prefix;
	}
	if (!args[0]) {
		const embed = new Discord.MessageEmbed();
		// If no command was specified, show every command in a list.
		embed.setTitle('Hello! I\'m Nuggies!');
		embed.setColor('RANDOM');
		embed.setDescription(`For more info about a specific command: \n Use ${prefix} help command_name.\n`);
		embed.addField('Slash commands', '`/meme`, `/cat`, `/8ball`, `/echo` (use @Nuggies register) to register', true);
		embed.setThumbnail(client.user.displayAvatarURL());
		embed.setFooter(`Want to change the prefix? Run the ${prefix}setprefix command!`);
		// Create a command list for each command category.
		config.categories.forEach(category => {
			let list = '';
			message.client.commands.forEach(command => {
				if (command.config.category != category) return;
				list += `\`${command.help.name}\`, `;
			});
			embed.addField(category, list.slice(0, -2), true);
		});
		message.channel.send(embed);
	}
	else {
		const command = args[0];
		if (client.commands.has(command)) {
			const cmd = client.commands.get(command);
			const b = new Discord.MessageEmbed()
				.setTitle('Command help!')
				.addField('``Description:``', cmd.help.description, false)
				.addField('``Usage:``', cmd.help.usage, false);
			message.channel.send(b);
			return;

		}
		else {
			return message.reply(':x: I couldn\'t find that command!');
		}
	}
};
