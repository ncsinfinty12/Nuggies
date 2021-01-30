/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args, utils) => {

	fs.readFile('./changelog.json', 'utf8', (err, jsonString) => {
		if (err) {
			message.channel.send('Code unable to access / read contents of the json file.');
			throw err;
		}
		try {
			const changelog = JSON.parse(jsonString);
			const changelogEmbed = new MessageEmbed()
				.setColor('RANDOM')
				.setDescription(`Changelogs for **${changelog.date}**`)
				.addField('\nChanges :', `\`\`\`${changelog.changelog}\`\`\``, true)
				.setFooter('Nuggies Help and Development Team');
			message.channel.send(changelogEmbed);
		}
		catch (err) {
			message.channel.send('Code unable to access / read contents of the json file.');
		}
	});
	await message.delete();
};

module.exports.help = {
	aliases: [],
	name: 'changelog',
	description: 'Changelogs for the Nuggies Support Discord Server',
	usage: 'changelog',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'owner',
	disable: false,
	cooldown: 0,
};