/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Invalid Permissions")
    const something = args.join(" ")
            const splitMessage=something.split(" ")
            const firstWord=splitMessage[0]
            var rest=splitMessage.slice(1, splitMessage.length)
    if(firstWord = "text"){ 
    const name = rest
            message.guild.channels.create(name, {type: 'text'})
                .then((channel) =>{
                    channel.setParent("714140527745957991")
                })}
    if(firstWord = "voice"){ 
    const name = rest
            message.guild.channels.create(name, {type: 'voice'})
                .then((channel) =>{
                    channel.setParent("714140527745957991")
                })}
    else{
        message.channel.send("Please provide valid type of channel")
    }
};


module.exports.help = {
	aliases: ['pp'],
	name: 'clear',
	description: 'nein',
	usage: 'clear',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};