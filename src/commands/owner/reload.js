/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	let command;
	if (client.commands.has(args[0])) {
		command = args[0];
	}
	else if (client.aliases.has(args[0])) {
		command = client.aliases.get(args[0]);
	}
	if (!command) {
		return message.channel.send(`I cannot find the command: ${args[0]}`);
	}
	else {
		message.channel.send(`Reloading: ${command}`)
			.then(m => {
				client.reload(command)
					.then(() => {
						m.edit(`Successfully reloaded: ${command}`);
					})
					.catch(e => {
						m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
					});
			});
	}
};

module.exports.help = {
	aliases: [],
	name: 'reload',
	description: 'reload a command',
	usage: config.prefix + 'reload',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'owner',
	disable: false,

};