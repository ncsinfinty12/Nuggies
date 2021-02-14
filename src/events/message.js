//                                               -- All our requirements --

const Discord = require('discord.js');
const utils = require('../../utils/utils');
const config = require('../../utils/config.json');
const blacklist = require('../../models/blacklistSchema');
const PrefiX = require('../../models/prefixSchema');
const chat = require('../../models/channelSchema');
const chatcord = require('chatcord');
const afk = require('../../models/afkSchema');
const chatting = new chatcord.Client();
const cmdhook = new Discord.WebhookClient(config.cmdhookID, config.cmdhookTOKEN);
const errhook = new Discord.WebhookClient(config.errhookID, config.errhookTOKEN);

module.exports = async (client, message) => {
//                                               -- Message Event Function --

	async function executecode(prefix) {
		if(message.author.bot) return;

// Ping Embed

		if(message.content === `<@!${client.user.id}>`) {
			const m = new Discord.MessageEmbed().setTitle('Hi, I\'m Nuggies !').setDescription('one of the most compact and easy to use bot on Discord !').addField('Prefix and Usage', 'The default prefix is `.` \n *Tip: Run .help` to get started! | use .setprefix <prefix> to change prefix!*').addField('Invites :', '[Support server](https://discord.gg/ut7PxgNdef) | [Bot invite](https://discord.com/oauth2/authorize?client_id=779741162465525790&permissions=1609952503&scope=bot%20applications.commands)').setColor('RANDOM');
			message.channel.send(m);
		}
// Basic command checks and argument definitions

		if (message.content.indexOf(prefix) !== 0) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		let command = args.shift().toLowerCase();

// Command Handler Dynamic Checks

		if (client.aliases.has(command)) 
			command = client.commands.get(client.aliases.get(command)).help.name;

		if (client.commands.get(command).config.restricted == true) {
			if (!config.developers.includes(message.author.id) && !config.globalmods.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot moderators / owners.');
		}

		if (client.commands.get(command).config.ownerOnly == true) {
			if (!config.developers.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
		}

		if (client.commands.get(command).config.disable == true) {
			return utils.errorEmbed(message, ':warning: This command is disabled for a short period of time! :warning:');
		}

		if (client.commands.get(command).config.args == true) {
			if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
		}

// Core Command Handler and Cooldown Checks

		const commandFile = client.commands.get(command);
		const cooldown = client.commands.get(command).config.cooldown;
		const timestamps = client.cooldowns.get(command);
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldown;
			if (Date.now() < expirationTime) {
				const timeLeft = utils.timer(expirationTime);
				return message.channel.send(`**\`${message.author.username}\`** | ⏰ Hold up! Command in cooldown for **\`${timeLeft}\`**`);
			}
		}

// Command Logs

		if (commandFile) {
			try{
				if (client.user.id === '779741162465525790') {
					if (!command) return;
					const m = new Discord.MessageEmbed().setTitle(`Command used in ${message.guild.name}`).setColor('RANDOM').addField('User:', `${message.author.tag}`).addField('User ID:', `${message.author.id}`).addField('Command:', `${command}`).addField('Message Content:', `${message.content}`).addField('Guild ID:', `${message.guild.id}`);
					await cmdhook.send(m);
				}
				await timestamps.set(message.author.id, Date.now());
				setTimeout(async () => await timestamps.delete(message.author.id), cooldown);
				await commandFile.run(client, message, args, utils);
			} // Command Errors
			catch (error) {
				if (client.user.id === '779741162465525790') {
					const errEmbed = new Discord.MessageEmbed().setTitle(`Command error in ${message.guild.name}`).addField('Additional Details', `**Guild ID :** ${message.guild.id}\n**Author :** ${message.author.tag}(${message.author.id})\n**Command :** ${commandFile.help.name}\n**Content :** ${message.content}`, false).setDescription(`**Error:**\n\`\`\`js\n${error}\n\`\`\``).setTimestamp();
					errhook.send(errEmbed);
				}
				return message.channel.send(`\`❌ COMMAND ERROR\` \`\`\`xl\n${(error.message)}\n\`\`\``);
			}
		}
	}

// Some basic command checks again and AFK function

	if (message.author.bot) return;
	const afkData = await afk.findOne({ id: message.author.id, GuildID: message.guild.id });
	if (afkData) {
		if (afkData.GuildID == message.guild.id) {
			await afk.findOneAndDelete({
				id: message.author.id,
				GuildID: message.guild.id,
			});
			message.channel.send('Welcome back **' + message.author.username + '**! You are no longer afk.');
		}
	}
	const pingeduser = (message.mentions.members.first());
	if (pingeduser) {
		const Data = await afk.findOne({ id: pingeduser.id, GuildID: message.guild.id });

		if (Data) {
			message.channel.send(`**${pingeduser.user.username}** is currently afk for: **${Data.reason}**`);
		}
	}

// Chat bot functionality

/*	chat.findOne({ _id: '6023f079f935032c19dd341a' }, async (err, data) => {
		if(err) throw err;
		if(!message.content) return;
		if(data.channelID.includes(message.channel.id)) {
			message.channel.startTyping();
			await chatting.chat(message.content).then(m => {
				message.reply(Discord.Util.removeMentions(m));
				message.channel.stopTyping();
			});
		}
	}); */

// Prefix decision / definition

	const Data = await PrefiX.findOne({ GuildID: message.guild.id });
	try {
		if(Data) {
			executecode(Data.Prefix);
		}

		else if (!Data) {
			executecode('.');
		}
	}
	catch (err) {
		if (err.message === 'Cannot read property \'config\' of undefined') return;
		if (err.code == 'MODULE_NOT_FOUND') return;
		console.error(err);
	}
};