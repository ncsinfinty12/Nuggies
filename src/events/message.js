/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const utils = require('../../utils/utils');
const config = require('../../utils/config.json');
const blacklist = require('../../models/blacklistSchema');
const PrefiX = require('../../models/prefixSchema');
const chat = require('../../models/channelSchema');
const chatcord = require('chatcord');
const afk = require('../../models/afkSchema');
const chatting = new chatcord.Client();

module.exports = async (client, message) => {

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
	if (afkData) {
		return;
	}
	if (message.channel.id === '799671677888757830' && message.author.id == '723112579584491571') {
		setTimeout(async function() {
			message.channel.startTyping();
			await chatting.chat(`${encodeURIComponent(message.content)}`).then(reply => {
				message.channel.send(Discord.Util.removeMentions(reply));
				message.channel.stopTyping();
				// The module will reply with the based on stimulus (1st parameter of the chat function!)
			}).catch(error => {
				return console.log(error.name),
				message.channel.stopTyping();
			});
		}, 2000);
	}

	chat.findOne({ _id: '5ffd88aa1e69af05e28b0761' }, (err, data) => {
		if (data.channelID.includes(message.channel.id)) {
			if (message.author.bot) return;
			message.channel.startTyping();
			chatting.chat(message.content).then(reply => {
				message.reply(reply);
				message.channel.stopTyping();
			});
		}
	});
	const Data = await PrefiX.findOne({ GuildID: message.guild.id });
	if (Data) {
		let prefix = Data.Prefix;
		if (client.user.id == '741000865288290435') {
			prefix = ('..');
		}
		if (message.author.bot) return;
		if (message.content === '<@!779741162465525790>') {
			const n = new Discord.MessageEmbed()
				.setTitle('Hi, I\'m Nuggies !')
				.setDescription('one of the most compact and easy to use bot on Discord !')
				.addField('Prefix and Usage', `The current prefix for This server is \`\`${Data.Prefix}\`\` \n *Tip: Run \`\`${Data.Prefix}help\`\` to get started!*`)
				.addField('Invites :', '[Support server](https://discord.gg/ut7PxgNdef) | [Bot invite](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=8&scope=bot)')
				.setColor('RANDOM');
			message.channel.send(n);
		}
		if (message.content.indexOf(prefix) !== 0) return;
		const result = await blacklist.findOne({ id: message.author.id });
		if (result) {
			message.author.send('You are blacklisted from using the bot, please join discord.gg/ut7PxgNdef to appeal.');
			return;
		}
	}
	else if (!Data) {
		let prefix = config.prefix;
		if (client.user.id == '741000865288290435') {
			prefix = ('..');
		}
		if (message.author.bot) return;
		if (message.content === '<@!779741162465525790>') {
			const n = new Discord.MessageEmbed()
				.setTitle('Hi, I\'m Nuggies !')
				.setDescription('one of the most compact and easy to use bot on Discord !')
				.addField('Prefix and Usage', `The current prefix for This server is \`\`${prefix}\`\` \n *Tip: Run \`\`${prefix}help\`\` to get started!*`)
				.addField('Invites :', '[Support server](https://discord.gg/ut7PxgNdef) | [Bot invite](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=8&scope=bot)')
				.setColor('RANDOM');
			message.channel.send(n);
		}
		if (message.content.indexOf(prefix) !== 0) return;
		const result = await blacklist.findOne({ id: message.author.id });
		if (result) {
			message.author.send('You are blacklisted from using the bot, please join discord.gg/ut7PxgNdef to appeal.');
			return;
		}
	}
	try {
		if (Data) {
			let prefix = Data.Prefix;
			if (client.user.id == '741000865288290435') {
				prefix = ('..');
			}
			if (message.author.bot) return;
			if (message.content.indexOf(prefix) !== 0) return;
			const m = new Discord.MessageEmbed()
				.setTitle(`Command used in ${message.guild.name}`)
				.setColor('RANDOM')
				.setDescription(`**Author :** ${message.author.username} \n **ID:** ${message.author.id} \n **Content:** ${message.content}`);
			client.shard.broadcastEval(`
				(async () => {
				const channel = await this.channels.cache.get('795207572398931968');
				if (channel) {
					channel.send({ embed: ${JSON.stringify(m)} });
				}
			})();
		`); const args = message.content.slice(prefix.length).trim().split(/ +/g);
			let command = args.shift().toLowerCase();

			if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;

			if (client.commands.get(command).config.restricted == true) {
				if (!config.ownerID.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners. :warning:');
			}
			if (client.commands.get(command).config.disable == true) {
				return utils.errorEmbed(message, ':warning: This command is disabled for a short period of time! :warning:');
			}
			if (client.commands.get(command).config.args == true) {
				if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
			}
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
			if (commandFile) {
				try{
					await timestamps.set(message.author.id, Date.now());
					setTimeout(async () => await timestamps.delete(message.author.id), cooldown);
					await commandFile.run(client, message, args, utils);
				}
				catch (error) {
					return message.channel.send(`\`❌ COMMAND ERROR\` \`\`\`xl\n${(error.message)}\n\`\`\``);
				}
			}
		}
		else if (!Data) {

			let prefix = config.prefix;
			if (client.user.id == '741000865288290435') {
				prefix = ('..');
			}
			if (message.author.bot) return;
			if (message.content.indexOf(prefix) !== 0) return;
			const m = new Discord.MessageEmbed()
				.setTitle(`Command used in ${message.guild.name}`)
				.setColor('RANDOM')
				.setDescription(`**Author :** ${message.author.username} \n **ID:** ${message.author.id} \n **Content:** ${message.content}`);
			client.shard.broadcastEval(`
				(async () => {
				const channel = await this.channels.cache.get('795207572398931968');
				if (channel) {
					channel.send({ embed: ${JSON.stringify(m)} });
				}
			})();
		`);
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			let command = args.shift().toLowerCase();

			if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;

			if (client.commands.get(command).config.restricted == true) {
				if (!config.ownerID.includes(message.author.id)) return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners. :warning:');
			}
			if (client.commands.get(command).config.disable == true) {
				return utils.errorEmbed(message, ':warning: This command is disabled for a short period of time! :warning:');
			}
			if (client.commands.get(command).config.args == true) {
				if (!args[0]) return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
			}
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
			if (commandFile) {
				try{
					await timestamps.set(message.author.id, Date.now());
					setTimeout(async () => await timestamps.delete(message.author.id), cooldown);
					await commandFile.run(client, message, args, utils);
				}
				catch (error) {
					return message.channel.send(`\`❌ COMMAND ERROR\` \`\`\`xl\n${(error.message)}\n\`\`\``);
				}
			}

		}
	}
	catch (err) {
		if (err.message === 'Cannot read property \'config\' of undefined') return;
		if (err.code == 'MODULE_NOT_FOUND') return;
		console.error(err);
	}
};