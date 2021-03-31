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

  const nuggiesStaff = await user.findOne({
    id: target.id,
  });

  if (!nuggiesStaff.developer) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`:warning: Error`)
        .setDescription(`This user doesn't have developer permissions`)
        .setColor(`RED`)
    );
  } else {

    await user.findOneAndUpdate({
      id: target.id,
      developer: false,
    });

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`<a:9689_tick:785181267758809120> Success!`)
        .setDescription(
          `Successfully revoked **<@${target.id}>'s** developer permissions`
        )
        .setColor(`GREEN`)
    );
    message.guild.members.cache
      .get(target.id)
      .send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Alert`)
          .setDescription(
            `Your developer permissions for **Nuggies** were revoked by **${message.author.tag}**`
          )
          .setColor(`RED`)
      );
  }
};

module.exports.help = {
  aliases: ["r-d"],
  name: "remove-dev",
  description: "Remove a developer from the permissions array",
  usage: config.prefix + "remove-dev <id>",
};

module.exports.config = {
  args: true,
  category: "Owner",
  disable: false,
  cooldown: 2000,
};
