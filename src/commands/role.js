/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
    let role;
            if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
            if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){
              role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())
          
              if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.reply(":x: Role not found")
            }
            if(args[0] && !isNaN(args[0])){
              role = message.guild.roles.cache.find(e => e.id == args[0])
              if(!message.guild.roles.cache.has(args[0])) return message.reply(":x: Role not found")
            }
          
            if(!role) return message.reply("You must mention role")
          let rolemembers;
          if(role.members.size > 20) rolemembers = role.members.map(e => `<@${e.id}>`).slice(0,20).join(", ") + ` and ${role.members.size - 20} more members...`
          if(role.members.size < 20) rolemembers = role.members.map(e => `<@${e.id}>`).join(", ")
          
            let embed = new Discord.MessageEmbed()
                .setColor(role.color)
                .setTitle(role.name)
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Showing information about ${role}`)
                .addFields(
                    {
                        name: "**❓ Name**",
                        value: role.name,
                        inline:true,
                    },
                    {
                        name: "**🆔 Id**",
                        value: role.id,
                        inline:true,
                    },
                    {
                        name: "**📲 Mentionable?**",
                        value: role.mentionable.toString().replace("true","Yes").replace("false","No"),
                        inline:true,
                    },
                    {
                        name: "**🎨 Color**",
                        value: role.color,
                        inline:true,
                    },
                    {
                        name: "**🍆 Size**",
                        value: role.members.size || 0,
                        inline:true,
                    },
                    {
                        name: "**↕ Position**",
                        value: role.position,
                        inline:true,
                    },
                    {
                        name: "**📅 Created At**",
                        value: role.createdAt,
                        inline:false,
                    },
                )
            
            message.channel.send(embed)
            
};


module.exports.help = {
	aliases: [],
	name: 'role',
	description: 'Get information about a role',
	usage: config.prefix + 'role Admin',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};