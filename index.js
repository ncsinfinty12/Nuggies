const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Discord.Client({ disableMentions: 'everyone' });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

// mongoose connect
mongoose.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if (err) return console.error(err);
	console.log('Connected to MongoDB database!');
});
// Utils & config requiring

const utils = require('./utils/utils');
const config = require('./utils/config.json');
const blacklist = require('./models/blacklistSchema');
// Handlers

fs.readdir('./src/commands/', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		const props = require(`./src/commands/${ f }`);
		props.fileName = f;
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

// Message Event
client.on('message', async message => {
	if(message.content === '<@!779741162465525790>') {
		const n = new Discord.MessageEmbed()
			.setTitle('Hi, I\'m Nuggies !')
			.setDescription('one of the most compact and easy to use bot on Discord !')
			.addField('Prefix and Usage', 'The current prefix for This server is ``.`` \n *Tip: Run ``.help`` to get started!*')
			.addField('invites :', '[support server](https://discord.gg/ut7PxgNdef) | [bot invite](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=8&scope=bot)')
			.setColor('RANDOM');
		message.channel.send(n);
	}
	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;
	const result = await blacklist.findOne({ id: message.author.id });
	if(result) {
		message.author.send('you are blacklisted from using the bot, please join discord.gg/ut7PxgNdef to appeal.');
		return;
	}
	try {
		if (message.author.bot) return;
		if (message.content.indexOf(config.prefix) !== 0) return;
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		let command = args.shift().toLowerCase();

		if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;

		if (client.commands.get(command).config.restricted == true) {
			if (!config.ownerID.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners. :warning:');
		}

		if (client.commands.get(command).config.args == true) {
			if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${config.prefix + 'help ' + client.commands.get(command).help.name}`);
		}

		const commandFile = require(`./src/commands/${command}.js`);
		commandFile.run(client, message, args, utils);

	}
	catch (err) {
		if (err.message === 'Cannot read property \'config\' of undefined') return;
		if (err.code == 'MODULE_NOT_FOUND') return;
		console.error(err);
	}
});
client.on('ready', async () => {
	console.log('bot is online!');
	client.user.setActivity('.help', { type: 'STREAMING', url: 'https://discord.gg/zzURhQGpRY' });
});
client.login('Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.QNR2rYobi2ihbZ57EduDtZl1srA');