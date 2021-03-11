/* eslint-disable no-unused-vars */

module.exports.run = async (client, message, args, utils) => {
	const DB = require('../../../models/users');
	DB.findOne({ id: message.author.id }, async (err, data) => {
		if (err) throw err;
		if(data) {
			if(data.premium == true) return message.channel.send('true');
			if(data.premium == false) {
				return message.channel.send('false');
			}
			else {message.channel.send('pp');}
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'test',
	description: 'Just test 🤷‍♂️',
	usage: 'test',
};

module.exports.config = {
	developers: true,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};