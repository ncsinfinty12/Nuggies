const Discord = require('discord.js');

module.exports = async (client, guild) => {
	if(guild.name == 'undefined') return;
	await client.data.deleteGuild(guild.id);
	const channel = await client.channels.cache.get('783160231734673408');
	const m = new Discord.MessageEmbed()
		.setTitle(`just left ${guild.name}`)
		.setFooter(`Total servers : ${client.guilds.cache.size} | Members : ${guild.membercount}`)
		.setColor('RED');
	channel.send(m);
};