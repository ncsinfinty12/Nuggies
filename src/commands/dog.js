/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
       async () =>{const body = await superagent("https://random.dog/woof.json")
        const embed = new discord.MessageEmbed()
            .setColor(0xab4aff)
            .setTitle("Cute ❤")
            .setImage(body.body.url)
        message.channel.send(embed);}
};


module.exports.help = {
	aliases: [],
	name: 'dog',
	description: 'nein',
	usage: 'dog',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};