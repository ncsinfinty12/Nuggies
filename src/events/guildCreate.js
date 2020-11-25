exports.run = async (guild) => {

	await guild.channels.cache.first().send('thanks for inviting me to the server!');

};