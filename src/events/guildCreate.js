exports.run = async (guild) => {

	let channelID;
	const channels = guild.channels.cache;

	channelLoop:
	for (const key in channels) {
		const c = channels[key];
		if (c[1].type === 'text') {
			channelID = c[0];
			break channelLoop;
		}
	}

	const channel = guild.channels.cache.get(guild.systemChannelID || channelID);
	channel.send('Thanks for inviting me into this server!');
};