const Discord = require('discord.js');

module.exports = (client, player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    
    const embed = new Discord.MessageEmbed()
    .setTitle('New Track')
    .setDescription(`Now Playing __**[${track.title}](${track.uri})**__ requested by ${track.requester.tag}`)
    .setColor('BLUE');
    channel.send(embed);
}
