const { Manager } = require('erela.js');

const nodes = [
  {
    host: "localhost",
    password: "idots",
    port: 4000,
  }
];

module.exports = class MusicManager {
    constructor(client) {
        this.manager = new Manager({
            nodes,
            send: (id, payload) => {
                const guild = client.guilds.cache.get(id);
                
                if (guild) guild.shard.send(payload);
            }
        });
        
        this.manager.on("nodeConnect", node => {
            console.log(`Node ${node.options.identifier} connected.`);
        });
        
        client.on("raw", d => this.manager.updateVoiceState(d));
    }
}
