/* eslint-disable no-unused-vars */
require('./utils/ExtendedMessage');
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const mongoose = require('mongoose');
const currency = require('./models/currencySchema');
const { table } = require('console');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ascii = require('ascii-table');
const config = require('./utils/config.json');
const { Manager } = require('erela.js');
const nodes = [
	{
		host: 'localhost',
		password: 'idots',
		port: 4000,
	},
];

client.manager = new Manager({
	nodes,
	send: (id, payload) => {
		const guild = client.guilds.cache.get(id);

		if (guild) guild.shard.send(payload);
	},
});

client.manager.on('nodeConnect', node => {
	console.log(`Node ${node.options.identifier} connected.`);
});
client.on('raw', d => this.manager.updateVoiceState(d));
client.once('ready', () => {
	client.manager.init(client.user.id);
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.snipes = new Discord.Collection();
client.esnipes = new Discord.Collection();
client.economy = require('./utils/economy');
client.data = require('./functions/mongo');

const unhhook = new Discord.WebhookClient(config.unhhookID, config.unhhookTOKEN);

async function startUp() {

	// load music events
	const musicEvents = fs.readdirSync('./src/musicevents').filter(file => file.endsWith('.js'));
	console.log(`Loading a total of ${musicEvents.length} events.`);
	for (const file of musicEvents) {
		const musicEvent = require(`./src/musicevents/${file}`);
		const musicEventName = file.split('.')[0];
		client.manager.on(musicEventName, musicEvent.bind(null, client));
	}
	// Handlers

	// load all events
	const eventtable = new ascii('Event\'s');
	eventtable.setHeading('Event', 'Load status');
	const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
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
	folders.forEach(direct => {
		const commandFiles = fs.readdirSync('./src/commands/' + direct + '/').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const props = require(`./src/commands/${direct}/${file}`);
			props.fileName = file;
			client.commands.set(props.help.name, props);
			client.cooldowns.set(props.help.name, new Discord.Collection());
			props.help.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
			tble.addRow(props.help.name, '✔');
		}
	});

	console.log(tble.toString());
	// const DBL = require('dblapi.js');
	// const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3OTc0MTE2MjQ2NTUyNTc5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjEyOTc4NDkwfQ.geSDKfgj7YQdMad9Z4FmyZd7XobpSWcdTpmsLzLUfQI', client);

	// mongoose connect
	client.data.connect('mongodb+srv://Assassin1234:K@rt00$99@cluster0.qonl3.mongodb.net/Nuggies_main').then(() => {
		// If it connects log the following
		console.log('Connected to MongoDB database!');
	}).catch((err) => {
		// If it doesn't connect log the following
		console.log('Unable to connect Economy to the Mongodb database. Error:' + err);
	});

	// functions
	// eslint-disable-next-line no-async-promise-executor
	client.bal = (id) => new Promise(async ful => {
		const data = await currency.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	});
	client.add = (id, coins) => {
		currency.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins += coins;
			}
			else {
				data = new currency({ id, coins });
			}
			data.save();
		});
	};
	client.remove = (id, coins) => {
		currency.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins -= coins;
			}
			else {
				data = new currency({ id, coins: -coins });
			}
			data.save();
		});
	};


	client.login('Njk0NTYwMDIzODc5MDkwMTk2.XoNZbQ.MFZZRtINoBmHkY1ZVfO5lXOEShA');
	// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.cKxvxEcyPI3HCd9-jcqVYgghgGs
	// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.qNuxbT2n0ce8FnMMCdmmP-VjcRU
}
startUp();


// For any unhandled errors

process.on('unhandledRejection', async (err) => {
	if(client.user) {
		if (client.user.id === '800588645006311444') {
			const errEmbed = new Discord.MessageEmbed()
				.setTitle('unhandledRejection Error')
				.setDescription(err.stack, { code: 'ini' })
				.setTimestamp();
			unhhook.send(errEmbed);
		}
	}
	return console.log(err);
});
