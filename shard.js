const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
	token: 'Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.4KGlhAqzYXkTDDADuP19-JRo1qc',
});
// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.cKxvxEcyPI3HCd9-jcqVYgghgGs
// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.4KGlhAqzYXkTDDADuP19-JRo1qc

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id + 1} launched`));

manager.spawn(2, 15000, -1);