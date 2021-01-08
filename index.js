/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Discord.Client({ disableMentions: 'everyone' });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.snipes = new Discord.Collection();
client.esnipes = new Discord.Collection();

const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3OTc0MTE2MjQ2NTUyNTc5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA4NTQyNTk3fQ.KEmsrFQu7QsGsGmj5raaRauApsE-vlOG-eNrFiEC9gI', client);
// mongoose connect
mongoose.connect('mongodb+srv://Assassin1234:K@rt00$99@cluster0.qonl3.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if (err) return console.error(err);
	console.log('Connected to MongoDB database!');
});
// Utils & config requiring

const utils = require('./utils/utils');
const config = require('./utils/config.json');
const blacklist = require('./models/blacklistSchema');
const PrefiX = require('./models/prefixSchema');
// Handlers

fs.readdir('./src/commands/', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		const props = require(`./src/commands/${f}`);
		props.fileName = f;
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.on('message', async message => {
	const Data = await PrefiX.findOne({ GuildID: message.guild.id });
	const cooldowns = new Discord.Collection();
	if (message.content === '<@!779741162465525790>') {
		const n = new Discord.MessageEmbed()
			.setTitle('Hi, I\'m Nuggies !')
			.setDescription('one of the most compact and easy to use bot on Discord !')
			.addField('Prefix and Usage', 'The current prefix for This server is ``.`` \n *Tip: Run ``.help`` to get started!*')
			.addField('invites :', '[support server](https://discord.gg/ut7PxgNdef) | [bot invite](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=8&scope=bot)')
			.setColor('RANDOM');
		message.channel.send(n);
	}
	if (Data) {
		const prefix = Data.Prefix;
		if (message.author.bot) return;
		if (message.content.indexOf(prefix) !== 0) return;
		const result = await blacklist.findOne({ id: message.author.id });
		if (result) {
			message.author.send('you are blacklisted from using the bot, please join discord.gg/ut7PxgNdef to appeal.');
			return;
		}
	}
	else if (!Data) {
		const prefix = config.prefix;
		if (message.author.bot) return;
		if (message.content.indexOf(prefix) !== 0) return;
		const result = await blacklist.findOne({ id: message.author.id });
		if (result) {
			message.author.send('you are blacklisted from using the bot, please join discord.gg/ut7PxgNdef to appeal.');
			return;
		}
	}
	try {
		if (Data) {
			const prefix = Data.Prefix;
			if (message.author.bot) return;
			if (message.content.indexOf(prefix) !== 0) return;
			const channel1 = client.channels.cache.get('795207572398931968');
			const m = new Discord.MessageEmbed()
				.setTitle(`Command used in ${message.guild.name}`)
				.setColor('RANDOM')
				.setDescription(`**Author :** ${message.author.username} \n **ID:** ${message.author.id} \n **Content:** ${message.content}`);
			channel1.send(m);
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			let command = args.shift().toLowerCase();

			if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;

			if (client.commands.get(command).config.restricted == true) {
				if (!config.ownerID.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners. :warning:');
			}
			if (client.commands.get(command).config.disable == true) {
				return utils.errorEmbed(message, ':warning: this command is disabled for a short period of time ! :warning:');
			}
			if (client.commands.get(command).config.args == true) {
				if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
			}

			const commandFile = require(`./src/commands/${command}.js`);
			commandFile.run(client, message, args, utils);

		}
		else if (!Data) {
			const prefix = config.prefix;
			if (message.author.bot) return;
			if (message.content.indexOf(prefix) !== 0) return;
			const channel1 = client.channels.cache.get('795207572398931968');
			const m = new Discord.MessageEmbed()
				.setTitle(`Command used in ${message.guild.name}`)
				.setColor('RANDOM')
				.setDescription(`**Author :** ${message.author.username} \n **ID:** ${message.author.id} \n **Content:** ${message.content}`);
			channel1.send(m);
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			let command = args.shift().toLowerCase();

			if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;

			if (client.commands.get(command).config.restricted == true) {
				if (!config.ownerID.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners. :warning:');
			}
			if (client.commands.get(command).config.disable == true) {
				return utils.errorEmbed(message, ':warning: this command is disabled for a short period of time ! :warning:');
			}
			if (client.commands.get(command).config.args == true) {
				if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
			}

			const commandFile = require(`./src/commands/${command}.js`);
			commandFile.run(client, message, args, utils);
		}
	}
	catch (err) {
		if (err.message === 'Cannot read property \'config\' of undefined') return;
		if (err.code == 'MODULE_NOT_FOUND') return;
		console.error(err);
	}
});
// ready
client.on('ready', async () => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`nuggies.tech | ${client.guilds.cache.size} servers`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO' });
});

client.on('guildCreate', async guild => {
	const m = new Discord.MessageEmbed()
		.setTitle(`just joined ${guild.name}`)
		.setFooter(`total servers : ${client.guilds.cache.size}`)
		.setColor('GREEN');
	client.channels.cache.get('783160231734673408').send(m);
});
client.on('guildDelete', async guild => {
	const m = new Discord.MessageEmbed()
		.setTitle(`just left ${guild.name}`)
		.setFooter(`total servers : ${client.guilds.cache.size}`)
		.setColor('RED');
	client.channels.cache.get('783160231734673408').send(m);
});

client.on('messageDelete', async message => {
	try {
		if (message.author.bot) return;
		const snipes = message.client.snipes.get(message.channel.id) || [];
		snipes.unshift({
			content: message.content,
			author: message.author,
			image: message.attachments.first()
				? message.attachments.first().proxyURL
				: null,
			date: new Date().toLocaleString('en-GB', {
				dataStyle: 'full',
				timeStyle: 'short',
			}),
		});
		snipes.splice(10);
		message.client.snipes.set(message.channel.id, snipes);
	}
	catch (e) {
		console.log(e);
	}
});

client.on('messageUpdate', async message => {
	try {
		if (message.author.bot) return;
		const esnipes = message.client.esnipes.get(message.channel.id) || [];
		esnipes.unshift({
			content: message.content,
			author: message.author,
			image: message.attachments.first()
				? message.attachments.first().proxyURL
				: null,
			date: new Date().toLocaleString('en-GB', {
				dataStyle: 'full',
				timeStyle: 'short',
			}),
		});
		esnipes.splice(10);
		message.client.esnipes.set(message.channel.id, esnipes);
	}
	catch (e) {
		console.log(e);
	}
});


client.login('Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.orZCqjlCd5CJc4bWJKz7wlrNSpM');
// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.9l4FuhpAyjzoT7zZrjnNzreb-lk
// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.orZCqjlCd5CJc4bWJKz7wlrNSpM