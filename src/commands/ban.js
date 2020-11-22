/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions")
            let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
            if (!User) return message.channel.send("Invalid User")
            let banReason = args.join(" ").slice(22);
            if (!banReason) {
            banReason = "None"
            }
            const person = message.mentions.users.first()
            const embed = new discord.MessageEmbed()
                .setTitle(person.username + " got banned by " + message.author.username)
                .setThumbnail("https://www.computing.co.uk/api/v1/wps/50fc940/19385fcb-fb6e-42f3-b41e-1abceb19bfe4/3/banned-580x358.jpg")
            message.channel.send(embed)
};


module.exports.help = {
	aliases: [],
	name: 'ban',
	description: 'nein',
	usage: 'ban',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};