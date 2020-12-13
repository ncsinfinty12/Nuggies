/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
    if(!args.join(" ")){
        if(!message.channel.topic){
            message.channel.topic = "No channel topic is set for this channel"
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(message.channel.name)
            .setDescription(`🗣  Channel Topic \n              ${message.channel.topic} \n\n🐱‍🏍  Type\n              ${message.channel.type}\n\n👪  Category\n              ${message.channel.parent}\n\n↕  Position\n              ${message.channel.position}\n\n🔞  NSFW\n              ${message.channel.nsfw}\n\n📅  Created At\n              ${message.channel.createdAt}`)
        message.channel.send(embed)
    }
    else{
        var channel = args.join(" ")
        channel = bot.channels.cache.get(channel)
        if(!channel.topic){
            channel.topic = "No channel topic is set for this channel"
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Information about **${channel.name}**`)
            .setDescription(`🗣  Channel Topic \n              ${channel.topic} \n\n🐱‍🏍  Type\n              ${channel.type}\n\n👪  Category\n              ${channel.parent}\n\n↕  Position\n              ${channel.position}\n\n🔞  NSFW\n              ${channel.nsfw}\n\n📅  Created At\n              ${channel.createdAt}`)
        message.channel.send(embed)
    }
};


module.exports.help = {
	aliases: ['channelinfo'],
	name: 'channel',
	description: 'Get info about channel channel',
	usage: config.prefix + 'channel',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};