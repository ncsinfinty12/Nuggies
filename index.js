/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const mongoose = require('mongoose');
const currency = require('./models/currencySchema');
const client = new Discord.Client({ disableMentions: 'everyone' });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.snipes = new Discord.Collection();
client.esnipes = new Discord.Collection();
client.economy = require('./utils/economy');

async function startUp() {

	// Handlers

	// load all events
	const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
	console.log(`Loading a total of ${eventFiles.length} events.`);
	for (const file of eventFiles) {
		const event = require(`./src/events/${file}`);
		const eventName = file.split('.')[0];
		console.log(`Loading Event - ${eventName}`);
		client.on(eventName, event.bind(null, client));
	}

	// iya's command loader
	const folders = await readdir('./src/commands/');
	console.log(`Loading a total of ${folders.length} categories.`);
	folders.forEach(direct => {
		const commandFiles = fs.readdirSync('./src/commands/' + direct + '/').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const props = require(`./src/commands/${direct}/${file}`);
			props.fileName = file;
			client.commands.set(props.help.name, props);
			props.help.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
			console.log(`Loading Command: ${props.help.name}.`);
		}
	});

	const DBL = require('dblapi.js');
	const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3OTc0MTE2MjQ2NTUyNTc5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA4NTQyNTk3fQ.KEmsrFQu7QsGsGmj5raaRauApsE-vlOG-eNrFiEC9gI', client);
	// mongoose connect
	mongoose.set('useFindAndModify', false);
	mongoose.connect('mongodb+srv://Assassin1234:K@rt00$99@cluster0.qonl3.mongodb.net/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() => {
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
	client.login('Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.orZCqjlCd5CJc4bWJKz7wlrNSpM');
}

startUp();

// For any unhandled errors
process.on('unhandledRejection', (err) => {
	console.log(err);
});
// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.9l4FuhpAyjzoT7zZrjnNzreb-lk
// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.orZCqjlCd5CJc4bWJKz7wlrNSpM