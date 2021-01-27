const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
	totalShards: 2,
	token: 'Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.u0Iu5BWfsNQXatJNnKQDjCrKlhE',
});
	// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.9l4FuhpAyjzoT7zZrjnNzreb-lk
	// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.u0Iu5BWfsNQXatJNnKQDjCrKlhE

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));