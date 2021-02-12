const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
	token: 'Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.qNuxbT2n0ce8FnMMCdmmP-VjcRU',
});
// token for beta - NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.cKxvxEcyPI3HCd9-jcqVYgghgGs
// token for nuggies - Nzc5NzQxMTYyNDY1NTI1Nzkw.X7k8jA.qNuxbT2n0ce8FnMMCdmmP-VjcRU

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

manager.spawn(2, 15000, -1);
