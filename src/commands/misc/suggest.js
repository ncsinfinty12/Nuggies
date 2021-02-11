/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const guild1 = client.guilds.cache.get('780334622164254720');
	const channel1 = guild1.channels.cache.get('783955997403643914');
	if(!args[0]) return message.channel.send('Please provide something to suggest !');
	const suggestion = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setColor('#2c2f33')
		.setTitle('Suggestion from ' + message.author.username)
		.setDescription('**' + suggestion + '**\n\n\n ')
		.setFooter('if you want to suggest something, use ' + config.prefix + 'suggest <suggestion>');
	client.shard.broadcastEval(`
		const e = this.channels.cache.get('783955997403643914');
		if(e) {
			e.send({embed: ${JSON.stringify(embed)}}).then(m => {
				m.react('👍');
				m.react('👎');
		})
			
		}
	`);
};


module.exports.help = {
	aliases: [],
	name: 'suggest',
	description: 'suggest something for the bot !',
	usage: config.prefix + 'suggest Make chat less dead',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'More',
	cooldown: 0,
};