/* eslint-disable no-unused-vars */
const { Client } = require('discord.js');
const { Database } = require('quickmongo');
const { GiveawaysManager } = require('discord-giveaways');
const client = new Client();
const db = new Database('mongodb+srv://Assassin1234:K@rt00$99@cluster0.qonl3.mongodb.net/Nuggies_main');
class extendedGiveawaysManager extends GiveawaysManager {
	async refreshStorage() {
		return this.giveawaysManager.getAllGiveaways();
	}

	async getAllGiveaways() {
		return await db.get('giveaways');
	}

	async saveGiveaway(messageID, giveawayData) {
		await db.push('giveaways', giveawayData);
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		const giveaways = await db.get('giveaways');
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
		newGiveawaysArray.push(giveawayData);
		await db.set('giveaways', newGiveawaysArray);
		return true;
	}

	async deleteGiveaway(messageID) {
		const data = await db.get('giveaways');
		const newGiveawaysArray = data.filter((giveaway) => giveaway.messageID !== messageID);
		await db.set('giveaways', newGiveawaysArray);
		return true;
	}
}