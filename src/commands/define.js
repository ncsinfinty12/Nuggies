/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    const saymessage = args.join(" ");
            trollface = urban(saymessage);
                trollface.first(function(json) {
                    try{message.channel.send("**"+saymessage+"**: "+json.definition + "\n\n" + json.example + "\n Go to " + json.permalink + " for more information");}
                    catch(error){message.channel.send("Word not found")}
                });
};


module.exports.help = {
	aliases: [],
	name: 'define',
	description: 'nein',
	usage: 'define',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};