module.exports = async (client, message) => {
	try {
		if (message.author.bot) return;
		const esnipes = message.client.esnipes.get(message.channel.id) || [];
		esnipes.unshift({
			content: message.content,
			author: message.author,
			image: message.attachments.first()
				? message.attachments.first().proxyURL
				: null,
			date: new Date().toLocaleString('en-GB', {
				dataStyle: 'full',
				timeStyle: 'short',
			}),
		});
		esnipes.splice(10);
		message.client.esnipes.set(message.channel.id, esnipes);
	}
	catch (e) {
		console.log(e);
	}
};