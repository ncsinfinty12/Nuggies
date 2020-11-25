exports.run = (guild) => {
	let defaultChannel = '';
	guild.channels.cache.forEach((channel) => {
		if(channel.type == 'text' && defaultChannel == '') {
			if(channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
				defaultChannel = channel;
			}
		}
		defaultChannel.send('thank you for inviting me !');

	});
};