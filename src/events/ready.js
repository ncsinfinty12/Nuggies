module.exports = async (client) => {

	console.log(`${client.user.username} is now online!`);
	client.user.setActivity('Nuggies.tech', { type: 'WATCHING' });
};