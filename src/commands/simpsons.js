/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = (client, message, args, utils) => {
    const hmm = args.join(" ")
            if(!hmm) return message.channel.send("Provide a text to show a simpsons gif related to.")
            message.channel.send("Please wait this might take a while").then(m =>{
            try{
               gifGenerator(hmm).then((gif) =>{
                   const embed = new discord.MessageEmbed()
                    .setTitle('Result for "'+ hmm+'"')
                    .setImage(gif)
                    .setFooter("Requested by "+ message.author.username)
                    message.channel.send(embed)
                m.delete()
               }) 
            }
            catch(error){message.channel.send("No gif found")}
            })
};


module.exports.help = {
	aliases: [],
	name: 'simpsons',
	description: 'nein',
	usage: 'simpsons',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};