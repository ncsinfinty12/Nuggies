/* eslint-disable no-unused-vars */
const config = require('../../utils/config.json');
const rp = require('request-promise');
const cheerio = require('cheerio');
module.exports.run = async (client, message, args, utils) => {
	rp('https://www.conversationstarters.com/generator.php').then(html => {
		const $ = cheerio.load(html);
		const text = $('#random').text();
		text
			? message.channel.send(` > ${text}`)
			: message.channel.send('Wooops! Looks like something happened while trying to retrieve a topic.');
	});
};

module.exports.help = {
	aliases: [],
	name: 'topic',
	description: 'get a topic to start a conversation !',
	usage: '.topic',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
};