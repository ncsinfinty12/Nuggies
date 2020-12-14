/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');
const tiyee = require('tiyee-url');

module.exports.run = async (client, message, args, utils) => {
	message.channel.send('Might take some time 🕐').then(m =>{
		const test = async function() {
			try{
				const longUrl = args.join(' ');
				let shortUrl = await tiyee.shortUrl(longUrl);
				shortUrl = 'https://' + shortUrl;
				const embed = new Discord.MessageEmbed()
					.setTitle('Shortened URL')
					.setDescription('I have shortened the URL you gave me')
					.setURL(longUrl)
					.addFields(
						{
							name: 'Long URL',
							value: longUrl,
							inline: false,
						},
						{
							name: 'Short URL',
							value: shortUrl,
							inline: false,
						},
					);
				m.delete();
				message.channel.send(embed);
			}
			catch(e) {
				message.channel.send('There was an error. Please check if you gave a valid url');
			}
		};

		test();

	});
};


module.exports.help = {
	aliases: ['urlshorten', 'urlshort', 'shorturl'],
	name: 'shortenurl',
	description: 'Get a short URL for a url you have',
	usage: config.prefix + 'shortenurl https://www.youtube.com/watch?v=5YaY9BvxcCw',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};