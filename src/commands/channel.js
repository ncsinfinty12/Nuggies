/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
    if(!args.join(" ")){
        if(!message.channel.topic){
            message.channel.topic = "No channel topic is set for this channel"
        }
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.channel.name)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`Here is some information about ${message.channel}`)
            .addFields(
                {
                    name: '🗣  Channel Topic',
                    value: `${message.channel.topic}`,
                    inline: true,
                },
                {
                    name:"🤷‍♂️  Type",
                    value: `${message.channel.type}`,
                    inline: true,
                },
                {
                    name:"👪  Category",
                    value: message.channel.parent,
                    inline: true,
                },
                {
                    name:"↕  Position",
                    value: message.channel.position,
                    inline: true,
                },
                {
                    name:"🔞  NSFW",
                    value: message.channel.nsfw,
                    inline: true,
                },
                {
                    name:"📅  Created At",
                    value: message.channel.createdAt,
                    inline: false,
                }
            )
        message.channel.send(embed)
    }
    else{
        var channel = args.join(" ")
        if(isNaN(channel)) return message.channel.send('Gimme channel id not other things');
        channel = bot.channels.cache.get(channel)
            if(!channel.topic){
                channel.topic = "No channel topic is set for this channel"
            }
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Information about **${channel.name}**`)
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Here is some information about ${channel}`)
                .addFields(
                    {
                        name: '🗣  Channel Topic',
                        value: `${channel.topic}`,
                        inline: true,
                    },
                    {
                        name:"🐱‍🏍  Type",
                        value: `${channel.type}`,
                        inline: true,
                    },
                    {
                        name:"👪  Category",
                        value: channel.parent,
                        inline: true,
                    },
                    {
                        name:"↕  Position",
                        value: channel.position,
                        inline: true,
                    },
                    {
                        name:"🔞  NSFW",
                        value: channel.nsfw,
                        inline: true,
                    },
                    {
                        name:"📅  Created At",
                        value: channel.createdAt,
                        inline: false,
                    }
            )
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