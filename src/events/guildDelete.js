const Discord = require('discord.js');

module.exports = async (client, guild) => {
	const channel = await client.channels.cache.get('783160231734673408');
	const m = new Discord.MessageEmbed()
		.setTitle(`just left ${guild.name}`)
		.setFooter(`total servers : ${client.guilds.cache.size}`)
		.setColor('RED');
	channel.send(m);
};