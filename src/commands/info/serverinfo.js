/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const filterLevels = {
		DISABLED: 'Off',
		MEMBERS_WITHOUT_ROLES: 'No Role',
		ALL_MEMBERS: 'Everyone',
	};

	const verificationLevels = {
		NONE: 'None',
		LOW: 'Low',
		MEDIUM: 'Medium',
		HIGH: '(╯°□°）╯︵ ┻━┻',
		VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
	};
	const regions = {
		brazil: 'Brazil',
		europe: 'Europe',
		hongkong: 'Hong Kong',
		india: 'India',
		japan: 'Japan',
		russia: 'Russia',
		singapore: 'Singapore',
		southafrica: 'South Africa',
		sydney: 'Sydney',
		'us-central': 'US Central',
		'us-east': 'US East',
		'us-west': 'US West',
		'us-south': 'US South',
	};
	const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
	const members = message.guild.members.cache;
	const channels = message.guild.channels.cache;
	const emojis = message.guild.emojis.cache;

	const embed = new MessageEmbed()
		.setDescription(`**Server information for ${message.guild.name}**`)
		.setColor('BLUE')
		.setThumbnail(message.guild.iconURL({ dynamic: true }))
		.addField('General', [
			`**:heart_exclamation: Name:** ${message.guild.name}`,
			`**:1234: ID:** ${message.guild.id}`,
			`**<:ownercrown:785125378187460618> Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
			`** :map: Region:** ${regions[message.guild.region]}`,
			`** <:boostbadge:785122045951344701> Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
			`** <:PanWoah:785126074619133982> Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
			`**<a:wooo:785125902023524353> Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
			'\u200b',
		])
		.addField('Server', [
			`** :ribbon: Role Count:** ${roles.length}`,
			`** :polar_bear: Emoji Count:** ${emojis.size}`,
			` **:bear: Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
			`**:panda_face: Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
			`** :man_cartwheeling: Member Count:** ${message.guild.memberCount}`,
			`** <:Man:785122987174002698> Humans:** ${members.filter(member => !member.user.bot).size}`,
			`** <:bot:785122780483289099> Bots:** ${members.filter(member => member.user.bot).size}`,
			`** <:hash:785124535095394354> Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
			`** :speaker: Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
			`** <:boostbadge:785122045951344701> Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
			'\u200b',
		])
		// .addField('Members', [
		// 	`**<:online:785124353628045362> Online:** ${members.filter(member => member.presence.status === 'online').size}`,
		// 	`**<:statusidle:751227734239477780>Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
		// 	`**<:dnd:785124430912290846> Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
		// 	`**<:statusoffline:785124410063323136> Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
		// 	'\u200b',
		// ])
		.setTimestamp();
	message.channel.send(embed);
};

module.exports.help = {
	aliases: [],
	name: 'serverinfo',
	description: 'Let\'s see how cool your server is',
	usage: config.prefix + 'serverinfo',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};