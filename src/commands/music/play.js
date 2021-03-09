module.exports.run = async (client, message, args, utils, data) => {
	const query = args.join(' ');
  let result;
  try {
    result = await client.manager.search(query, message.author);
  } catch (e) {
    return message.channel.send("There was an error searching for the song.");
  }
  
  const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
  });
  
  player.connect();
  player.queue.add(result.tracks[0]);
  
  if (!player.playing && !player.paused && !player.queue.size) player.play();
  message.channel.send(`Added **${result.tracks[0].title}** to the queue.`);
};

module.exports.help = {
	aliases: [],
	name: 'play',
	description: 'Play a song',
	usage: '.play <query>',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Music',
	disable: false,
	cooldown: 10000,
};
