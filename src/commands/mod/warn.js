/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');
const Discord = require('discord.js');
const warnings = require('../../../models/warningSchema');

module.exports.run = async (client, message, args) => {
	const perms = message.member.permissions;
	const hasKick = perms.has('KICK_MEMBERS');
	if(!hasKick) return message.channel.send('You are missing permissions to use this command!');

	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if(!member) return message.channel.send('This user is not identified in your guild');

	if(message.author.id === member.id) return message.channel.send('You cannot warn yourself unfortunately');

	if(member.id === client.user.id) return message.channel.send('You ain\'t finna warn me!');

	if (member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send('You cannot warn someone with an equal or higher role');}

	let reason = args.slice(1).join(' ');
	if(!reason) reason = 'Not specified';

	const embed = new Discord.MessageEmbed();

	const data = await warnings.findOne({
		GuildID: message.guild.id,
		UserID: member.id,
	});
	message.delete({ timeout: 3000 });
	if(data) {
		data.Punishments.unshift({
			Timestamp: new Date().getTime(),
			Moderator: message.author.username,
			Reason: reason,
		});
		data.save();

		const guildName = message.guild.name;
		member.send(`You were warned in **${guildName}** for the reason *${reason}*`);
		embed.setDescription(`Successfully warned ${member} for \`${reason}\``);
		embed.setColor('RED');
		message.channel.send(embed);
	}
	else if (!data) {
		const newData = new warnings({
			GuildID: message.guild.id,
			UserID: member.id,
			Punishments: [{
				Timestamp: new Date().getTime(),
				Moderator: message.author.username,
				Reason: reason,
			} ],
		});
		newData.save();

		embed.setDescription(`Warned ${member} for \`${reason}\``);
		embed.setColor('RED');
		message.channel.send(embed);
	}
};

module.exports.help = {
	aliases: [],
	name: 'warn',
	description: 'Warns a member of the guild and saves it on a database schema',
	usage: config.prefix + 'warn @user <reason>',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Moderation',
	disable: false,
};