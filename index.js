/* eslint-disable no-unused-vars */
require('dotenv').config();
require('./utils/ExtendedMessage');
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const client = new Discord.Client({ disableMentions: 'everyone' });
const ascii = require('ascii-table');
const config = require('./utils/config.json');
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.snipes = new Discord.Collection();
client.esnipes = new Discord.Collection();
client.data = require('./functions/mongo');

const unhhook = new Discord.WebhookClient(process.env.unhandled_rejection_webhook_id, process.env.command_webhook_token);

async function startUp() {
	// Handlers

	// load all events
	const eventtable = new ascii('Event\'s');
	eventtable.setHeading('Event', 'Load status');
	const eventFiles = fs
		.readdirSync('./src/events/')
		.filter((file) => file.endsWith('.js'));
	console.log(`Loading a total of ${eventFiles.length} events.`);
	for (const file of eventFiles) {
		const event = require(`./src/events/${file}`);
		const eventName = file.split('.')[0];
		eventtable.addRow(eventName, '✔');
		client.on(eventName, event.bind(null, client));
	}
	console.log(eventtable.toString());
	// iya's command loader
	const tble = new ascii('Commands');
	tble.setHeading('Command', 'Load status');
	const folders = await readdir('./src/commands/');
	console.log(`Loading a total of ${folders.length} categories.`);
	folders.forEach((direct) => {
		const commandFiles = fs.readdirSync('./src/commands/' + direct + '/').filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const props = require(`./src/commands/${direct}/${file}`);
			props.fileName = file;
			client.commands.set(props.help.name, props);
			client.cooldowns.set(props.help.name, new Discord.Collection());
			props.help.aliases.forEach((alias) => {
				client.aliases.set(alias, props.help.name);
			});
			tble.addRow(props.help.name, '✔');
		}
	});

	console.log(tble.toString());
	// only if you have a bot on top.gg
	const DBL = require('dblapi.js');
	const dbl = new DBL(process.env.dbl, client);

	// mongoose connect
	client.data.connect(process.env.mongo)
		.then(() => {
			// If it connects log the following
			console.log('Connected to MongoDB database!');
		}).catch((err) => {
			// If it doesn't connect log the following
			console.log('Unable to connect to the Mongodb database. Error:' + err);
		});

	client.login(process.env.token);
}
startUp();

// For any unhandled errors

process.on('unhandledRejection', async (err) => {
	if (client.user) {
		if (client.user.id === '800588645006311444') {
			const errEmbed = new Discord.MessageEmbed().setTitle('unhandledRejection Error').setDescription(err.stack, { code: 'ini' }).setTimestamp();
			unhhook.send(errEmbed);
		}
	}
	return console.log(err);
});