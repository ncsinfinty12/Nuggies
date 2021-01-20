const Discord = require('discord.js')
const muteRoleModel = require('../../../models/muteRoleSchema.js');

module.exports.run = async (client, message, args, utils) => {
  const muteRole = message.mentions.roles.first();
  if(!muteRole) return message.channel.send(errEmbed)

  const errEmbed = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setAuthor('Error executing the command')
  .setDescription('Please mention a valid role or role ID')
  const perms = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setAuthor('Error executing the command')
  .setDescription('You need the ``Manage Server`` permission to run this command!')
  const success = new Discord.MessageEmbed()
  .setColor('#00FF00')
  .setAuthor('Command successfully executed!')
  .setDescription(`Mute role successfully set as **\`${muteRole.name}\`**`)
  const success2 = new Discord.MessageEmbed()
  .setColor('#00FF00')
  .setAuthor('Command successfully executed!')
  .setDescription(`Mute role successfully set as **\`${muteRole.name}\`**`)

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(perms)
    
    const data = await muteRoleModel.findOne({
		GuildID: message.guild.id,
  });

  if (data) {
  await muteRoleModel.findOneAndRemove({
    GuildID: message.guild.id,
      });
      message.channel.send(success)

  const newData = new muteRoleModel({
      MuteRole: muteRole.id,
      GuildID: message.guild.id,
  });
  newData.save();
}

else if (!data) {
  message.channel.send(success2)

  const newData = new muteRoleModel({
      MuteRole: muteRole.id,
      GuildID: message.guild.id,
  });
  newData.save();
}
};
module.exports.help = {
	aliases: ['mutedrole'],
	name: 'muterole',
	description: 'Change the guild\'s mute role',
	usage: 'muterole @role',
}

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
}