/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const saymessage = args.join(" ")
            translate(saymessage, {to: 'en'}).then(res => {
                message.channel.send("**Translated text: **"+res.text+"\n**Translated from: **"+res.from.language.iso+"\n\n**Requested by: **"+message.author.username);
            }).catch(err => {
                console.error(err);
            });
};


module.exports.help = {
	aliases: [],
	name: 'suggest',
	description: 'nein',
	usage: 'suggest',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};