module.exports = async (client) => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`nuggies.tech | ${client.guilds.cache.size} serverss`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO' });
};