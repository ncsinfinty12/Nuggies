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

	// TODO: IF GUILD OWNER IS BLACKLISTED, MAKE THE BOT LEAVE THE GUILD
	const channel = client.channels.cache.get(guild.systemChannelID || channelID);
	channel.send('Thanks for inviting me into this server! Please do .info and .help for the informations you need in order for the bot to work properly. Do .suggest or .bug if there\'s any suggestions or bug you found. THANKS');

};