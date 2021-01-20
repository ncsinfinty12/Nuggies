module.exports = async (client) => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`nuggies.tech | ${client.guilds.cache.size} servers`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO' });
	const bchannelId = '799671677888757830';
	try {
		const channel = client.channels.cache.get(bchannelId);
		channel.send('Hi');
	}
	catch (e) {
		console.error(`Unable to find bchannel: ${bchannelId}`);
	}
};