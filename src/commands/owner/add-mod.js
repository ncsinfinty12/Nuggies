/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const config = require("../../../utils/config.json");
const staff = require("../../../models/nuggiesStaff");

module.exports.run = async (client, message, args) => {
  const target =
    message.mentions.members.first() ||
    message.guild.members.cache.find(
      (m) =>
        m.user.id === args[0] ||
        m.user.tag.startsWith(args[0]) ||
        m.displayName.startsWith(args[0])
    );
  const GuildID = "780334622164254720";

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

  const nuggiesStaff = await staff.findOne({
    _id: GuildID,
  });

  if (nuggiesStaff) {
    if (nuggiesStaff.Moderators.includes(target.id)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Error`)
          .setDescription(`This user already has moderator permissions`)
          .setColor(`RED`)
      );
    } else {
      nuggiesStaff.Moderators.addToSet(`${target.id}`);

      await nuggiesStaff.save().catch((error) => console.log(error));

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`<a:9689_tick:785181267758809120> Success!`)
          .setDescription(
            `**<@${target.id}>** was successfully given moderator permissions`
          )
          .setColor(`GREEN`)
      );
      message.guild.members.cache
        .get(target.id)
        .send(
          new Discord.MessageEmbed()
            .setTitle(`:warning: Alert`)
            .setDescription(
              `You were granted moderator permissions by **${message.author.tag}** for **Nuggies**`
            )
            .setColor(`GREEN`)
        );
    }
  } else if (!nuggiesStaff) {
    const newE = new staff({
      _id: GuildID,
      Moderators: [`${target.id}`],
    });

    await newE.save().catch((error) => console.log(error));

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`<a:9689_tick:785181267758809120> Success!`)
        .setDescription(
          `**<@${target.id}>** was successfully given moderator permissions`
        )
        .setColor(`GREEN`)
    );
    message.guild.members.cache
      .get(target.id)
      .send(
        new Discord.MessageEmbed()
          .setTitle(`:warning: Alert`)
          .setDescription(
            `You were granted moderator permissions by **${message.author.tag}** for **Nuggies**`
          )
          .setColor(`GREEN`)
      );
  }
};

module.exports.help = {
  aliases: ["a-m"],
  name: "add-mod",
  description: "Add a moderator to the permissions array",
  usage: config.prefix + "add-dev <id>",
};

module.exports.config = {
  developers: true,
  args: true,
  category: "Owner",
  disable: false,
  cooldown: 2000,
};
