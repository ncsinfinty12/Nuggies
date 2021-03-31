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

  const checkTarget = message.guild.members.cache.get(`${target.id}`);
  if (!checkTarget) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`:warning: Error`)
        .setDescription(
          `That user doesn't even exist. Not even sure what you're on about`
        )
        .setColor(`RED`)
    );
  }

  const nuggiesStaff = await user.findOne({
    id: target.id,
  });

  if (nuggiesStaff) {
    if (nuggiesStaff.developer) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Error`)
          .setDescription(`This user already has developer permissions`)
          .setColor(`RED`)
      );
    } else {
      nuggiesStaff.developer = true;
      await nuggiesStaff.save().catch((error) => console.log(error));

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`<a:9689_tick:785181267758809120> Success!`)
          .setDescription(
            `**<@${target.id}>** was successfully given developer permissions`
          )
          .setColor(`GREEN`)
      );
      message.guild.members.cache
        .get(target.id)
        .send(
          new Discord.MessageEmbed()
            .setTitle(`:warning: Alert`)
            .setDescription(
              `You were granted developer permissions by **${message.author.tag}** for **Nuggies**`
            )
            .setColor(`GREEN`)
        );
    }
  } else if (!nuggiesStaff) {
    const newE = new user({
      id: target.id,
      developer: true,
    });

    await newE.save().catch((error) => console.log(error));

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`<a:9689_tick:785181267758809120> Success!`)
        .setDescription(
          `**<@${target.id}>** was successfully given developer permissions`
        )
        .setColor(`GREEN`)
    );
    message.guild.members.cache
      .get(target.id)
      .send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Alert`)
          .setDescription(
            `You were granted developer permissions by **${message.author.tag}** for **Nuggies**`
          )
          .setColor(`GREEN`)
      );
  }
};

module.exports.help = {
  aliases: ["a-d"],
  name: "add-dev",
  description: "Add a developer to the permissions array",
  usage: config.prefix + "add-dev <id>",
};

module.exports.config = {
  args: true,
  category: "Owner",
  disable: false,
  cooldown: 2000,
};
