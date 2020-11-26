/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
    if(!message.author.bot){
        if(!message.mentions.users.first()){
            const embed = new discord.MessageEmbed()
                .setColor(0x9f7ee0)
                .setTitle(message.author.username + "'s Avatar")
                .setImage(message.author.displayAvatarURL())
            message.channel.send(embed);}
        else{
            const user = message.mentions.users.first()
            const embed = new discord.MessageEmbed()
                .setColor(0x9f7ee0)
                .setTitle(user.username + "'s Avatar")
                .setImage(user.displayAvatarURL())
            message.channel.send(embed);
}}}


module.exports.help = {
	aliases: ['av'],
	name: 'avatar',
	description: 'nein',
	usage: 'avatar',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};