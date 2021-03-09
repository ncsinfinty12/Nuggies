const { Manager } = require('lavacord');

const nodes = [
    { id: "1", host: "localhost", port: 4000, password: "idots" }
];

module.exports = class MusicManager {
    constructor(client) {
        this.manager = new Manager(nodes, {
            user: client.user.id,
            shards: client.shard.count,
            send: (packet) => {
                // shrug
            }
        });
        
        await this.manager.connect();
    }
}
