/* eslint-disable no-unused-vars */
function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}

module.exports.run = async (client, message, args, utils) => {
	console.log('bruh');
};

module.exports.help = {
	aliases: [],
	name: 'eval',
	description: 'Just eval 🤷‍♂️',
	usage: 'eval',
};

module.exports.config = {
	args: true,
	restricted: true,
	category: 'Owner',
	disable: true,
	cooldown: 0,
};