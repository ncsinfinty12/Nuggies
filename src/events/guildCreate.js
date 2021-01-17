const Discord = require('discord.js');

module.exports = async (client, guild) => {
	const m = new Discord.MessageEmbed()
		.setTitle(`just joined ${guild.name}`)
		.setFooter(`total servers : ${client.guilds.cache.size}`)
		.setColor('GREEN');
	client.shard.broadcastEval(`
		(async () => {
		const channel = await this.channels.cache.get('783160231734673408');
		if (channel) {
			channel.send({ embed: ${JSON.stringify(m)} });
		}
	})();
`);
};