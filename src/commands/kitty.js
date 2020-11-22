/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    async () => {
        const body = await superagent("http://aws.random.cat/meow")
        const embed = new discord.MessageEmbed()
            .setColor(0xab4aff)
            .setTitle("Cute ❤")
            .setImage(body.body.file)
        message.channel.send(embed);
      }
};


module.exports.help = {
	aliases: [],
	name: 'kitty',
	description: 'nein',
	usage: 'kitty',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};