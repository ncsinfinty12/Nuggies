/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE ROLES` permission');
	if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('❌**Error:** I don\'t have the **Manage Roles** permission!');
	if (message.mentions.users.size === 0) return message.reply('❌Please mention a user to give the role to.\nExample: `addrole @user Members`');
	const member = message.guild.member(message.mentions.users.first());
	if (!member) return message.reply('❌**Error:** That user does not seem valid.');
	const rname = message.content.split(' ').splice(2).join(' ');
	const role = message.guild.roles.cache.find(val => val.name === rname);
	if (!role) return message.reply(`❌**Error:** ${rname} isn't a role on this server!`);
	const botRolePosition = message.guild.member(client.user).roles.highest.position;
	const rolePosition = role.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.reply('❌**Error:** your role is lower than the specified role.');
	if (botRolePosition <= rolePosition) return message.reply('❌**Error:**  my highest role is lower than the specified role.');
	member.roles.add(role).catch(e => {
		return message.reply(`❌**Error:**\n${e}`);
	});
	const be = new Discord.MessageEmbed()
		.setTitle('Role Added!')
		.setDescription(`**${message.author.username}**, I've added the **${rname}** role to **${message.mentions.users.first().username}**`);
	message.channel.send(be);
};

module.exports.help = {
	aliases: [],
	name: 'addrole',
	description: 'Add any role to any user',
	usage: config.prefix + 'addrole <@user> rolename',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 1000,
};