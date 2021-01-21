module.exports = async (client) => {
	const values = await client.shard.fetchClientValues('guilds.cache.size');
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`nuggies.tech | ${values.reduce((acc, count) => acc + count, 0)} servers`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO' });
};