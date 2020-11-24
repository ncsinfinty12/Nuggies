/* eslint-disable no-shadow */
const settings = require('../../utils/config.json');
const fs = require('fs');
module.exports = guild => {
	const client = guild.client;
	let channelID;
	const channels = guild.cache.channels;
	channelLoop:
	for (const c of channels) {
		const channelType = c[1].type;
		if (channelType === 'text') {
			channelID = c[0];
			break channelLoop;
		}
	}


	const owner = guild.ownerID;
	if(owner !== settings.ownerid) {
		const channel = client.channels.cache.get(guild.systemChannelID || channelID);
		channel.send('Thanks for inviting me into this server! Please do .info and .help for the informations you need in order for the bot to work properly. Do .suggest or .bug if there\'s any suggestions or bug you found. THANKS');

		const blacklist = JSON.parse(fs.readFileSync('../../blacklist.json', 'utf8'));
		client.guilds.forEach((guild) => {
			if (!blacklist[guild.ownerID]) return;
			if(blacklist[guild.ownerID].state === true) {
				channel.send('But UNFORTUNATELY, the owner of this server has been blacklisted before so I\'m LEAVING! Bye!');
				guild.leave(guild.id);
			}
		});
	}
};