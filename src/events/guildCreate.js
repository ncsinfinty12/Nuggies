const Discord = require('discord.js');

module.exports = async (client, guild) => {
	const channel = await client.channels.cache.get('783160231734673408');
	const m = new Discord.MessageEmbed()
		.setTitle(`just joined ${guild.name}`)
		.setFooter(`Total servers : ${client.guilds.cache.size} | Members : ${guild.memberCount}`)
		.setColor('GREEN');
	channel.send(m);
};
