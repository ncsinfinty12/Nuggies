const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
	totalShards: 2,
	token: 'NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.cKxvxEcyPI3HCd9-jcqVYgghgGs',
});
	// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.cKxvxEcyPI3HCd9-jcqVYgghgGs
	// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.u0Iu5BWfsNQXatJNnKQDjCrKlhE

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));