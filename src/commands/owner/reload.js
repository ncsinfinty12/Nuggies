/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

module.exports.run = async (client, message, args, utils) => {
	if(!args.length) return message.channel.send('Please provide a command to reload!');
	const commandName = args[0].toLowerCase();
	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) {
		return message.channel.send('That doesn\'t exist on the bot. Not sure what you on about!');
	}
	const realFolder = await readdir('./src/commands/');
	const commandFiles = realFolder.find(folder => fs.readdirSync(`./src/commands/${folder}`).includes(`${commandName}.js`));

	delete require.cache[require.resolve(`../${commandFiles}/${command.help.name}.js`)];

	try {
		const newCommand = require(`../${commandFiles}/${command.help.name}.js`);
		client.commands.set(newCommand.help.name, newCommand);
		message.channel.send(`Command \`${command.help.name}\` was reloaded!`);
	}
	catch (error) {
		console.error(error);
		message.channel.send(`There was an error while reloading a command \`${command.help.name}\`:\n\`${error.message}\``);
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
	category: 'Owner',
	disable: false,
	cooldown: 0,

};