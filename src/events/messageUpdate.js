module.exports = async (client, oldMessage, newMessage) => {
	try {
		if (newMessage.author.bot) return;
		const esnipes = client.esnipes.get(newMessage.channel.id) || [];
		esnipes.unshift({
			oldContent: oldMessage.content,
			newContent: newMessage.content,
			link: newMessage.url,
			author: newMessage.author,
			image: newMessage.attachments.first()
				? newMessage.attachments.first().proxyURL
				: null,
			date: new Date().toLocaleString('en-GB', {
				dataStyle: 'full',
				timeStyle: 'short',
			}),
		});
		esnipes.splice(10);
		client.esnipes.set(newMessage.channel.id, esnipes);
	}
	catch (e) {
		console.log(e);
	}
};