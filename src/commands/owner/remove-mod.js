/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const config = require("../../../utils/config.json");
const user = require("../../../models/users");

module.exports.run = async (client, message, args) => {
  const target =
    message.mentions.members.first() ||
    message.guild.members.cache.find(
      (m) =>
        m.user.id === args[0] ||
        m.user.tag.startsWith(args[0]) ||
        m.displayName.startsWith(args[0])
    );

    const superMods = ["555064829946232832", "734006373343297557", "460078206326800434"]
    if(!superMods.includes(message.author.id)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Failed`)
          .setDescription(
            `You do not have enough privileges to execute this command`
          )
          .setColor(`RED`)
      );
    }
    if(!target) return message.channel.send(`You did not mention a user to grant privileges to.`)
    
    const checkTarget = message.guild.members.cache.get(`${target.id}`);
    if (!checkTarget) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Error`)
          .setDescription(
            `${target} is not a valid user. Not even sure what you're on about`
          )
          .setColor(`RED`)
      );
    }

  const fetch = await client.data.getUserDB(target.id)

  if (fetch.moderator) {

    await client.data.moderator(target.id, 'false')
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`<a:9689_tick:785181267758809120> Success!`)
        .setDescription(
          `Successfully revoked **<@${target.id}>'s** moderator permissions`
        )
        .setColor(`RED`)
    );
    return message.guild.members.cache
      .get(target.id)
      .send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Alert`)
          .setDescription(
            `Your moderator permissions for **Nuggies** were revoked by **${message.author.tag}**`
          )
          .setColor(`RED`)
      );
  } else {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`:warning: Error`)
        .setDescription(`This user doesn't have moderator permissions`)
        .setColor(`RED`)
    );
  }
};

module.exports.help = {
  aliases: ["r-m"],
  name: "remove-mod",
  description: "Remove a moderator from the permissions array",
  usage: config.prefix + "remove-dev <id>",
};

module.exports.config = {
  category: "Owner",
  disable: false,
  cooldown: 2000,
};
