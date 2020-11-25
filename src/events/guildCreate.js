exports.run = (guild) => {
	const channels = guild.channels.cache.filter(channel => channel.type == 'text');

	channels.first().send('Thank you for inviting me!').catch(e => console.log(e));
};