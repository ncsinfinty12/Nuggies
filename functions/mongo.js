const mongoose = require('mongoose');
const { GooseCache } = require('goosecache');
const cachegoose = new GooseCache(mongoose, {
	engine: 'memory',
});
mongoose.set('useFindAndModify', false);
const usersDB = require('../models/users');
const guildsDB = require('../models/guilds');

module.exports = {
	/**
     * @param {string} uri - Mongo Connection URI
     */
	async connect(uri) {
		if (!uri) throw new Error('Please provide a Mongoose URI');
		return mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	/**
     * @param {string} guildID - ID of the Guild
     */
	async getGuildDB(guildID) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		const guild = await guildsDB.findOne({ id: guildID }).cache(60);
		if (!guild) {
			const newG = new guildsDB({ id: guildID });
			const {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
			} = newG;
			await newG.save().catch(error => console.log(error));
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
			};
		}
		else {
			const prefix = guild.prefix;
			const registeredAt = guild.registeredAt;
			const chatbot_enabled = guild.chatbot_enabled;
			const chatbot_channel = guild.chatbot_channel;
			const automeme_enabled = guild.automeme_enabled;
			const automeme_channel = guild.automeme_channel;
			const mute_role = guild.mute_role;
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
			};
		}
	},
	/**
   * @param {string} userID - ID of the User
   */
	async getUserDB(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID }).cache(60);
		if (!user) {
			const newUs = new usersDB({ id: userID });
			const { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers } = newUs;
			await newUs.save().catch(error => console.log(error));
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers };
		}
		else {
			const registeredAt = user.registeredAt;
			const blacklisted = user.blacklisted;
			const blacklisted_reason = user.blacklisted_reason;
			const is_afk = user.is_afk;
			const afkReason = user.afkReason;
			const premium = user.premium;
			const tier = user.tier;
			const premiumservers = user.premiumservers;
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers };
		}
	},
	/**
   * @param {string} userID - ID of the User
   * @param {string} reason - afk reason
   */
	async setAfk(userID, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!reason) throw new Error('AFK reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { reason };
		}
		else {
			user.is_afk = true;
			user.afkReason = reason;
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
	},
	/**
    * @param {string} userID - ID of the User
    */
	async removeAfk(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { userID };
		}
		else {
			user.is_afk = false;
			user.afkReason = null;
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { userID };
		}
	},
	/**
* @param {string} userID - ID of the User
* @param {string} toggle - blacklist toggle
* @param {string} reason - blacklisted reason
*/
	async blacklist(userID, toggle, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!toggle) throw new Error('Please Provide a toggle');
		if (!reason) throw new Error('Blacklist reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await newUs.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
		else {
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
	},
	/**
 * @param {string} guildID - ID of the Guild
 */
	async deleteGuild(guildID) {
		await guildsDB.deleteOne({ id: guildID });
		return;
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} prefix - Guild prefix
     */
	async setPrefix(guildID, prefix) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!prefix) throw new Error('Please Provide a prefix!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { prefix };
		}
		guild.prefix = prefix;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { prefix };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} toggle - chatbot_enabled
     */
	async setchatbot_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.chatbot_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
    * @param {string} guildID - ID of the User
    * @param {string} channel - chatbot channel
    */
	async setchatbot_channel(guildID, channel) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!channel) throw new Error('Please Provide a channel!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { channel };
		}
		guild.chatbot_channel = channel;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { channel };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} toggle - automeme_enabled
     */
	async setautomeme_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.automeme_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
    * @param {string} guildID - ID of the User
    * @param {string} channel - automeme channel
    */
	async setautomeme_channel(guildID, channel) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!channel) throw new Error('Please Provide a channel!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { channel };
		}
		guild.automeme_channel = channel;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { channel };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} role - mute role
    */
	async setmute_role(guildID, role) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!role) throw new Error('Please Provide a role!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { role };
		}
		guild.mute_role = role;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { role };
	},
	/**
* @param {string} guildID - ID of the User
* @param {string} toggle - snipe toggle
*/
	async setafk_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.afk_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} role - snipe role
     */
	async setafk_role(guildID, role) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!role) throw new Error('Please Provide a role!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { role };
		}
		guild.afk_role = role;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { role };
	},
	/**
	* @param {string} guildID - ID of the User
	* @param {string} toggle - premium toggle
	*/
	async premiumGuild(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		guild.premium = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
	* @param {string} guildID - ID of the User
	* @param {string} toggle - premium toggle
	*/
	async pushguild(user, guildID, method) {
		if(!method) return new Error('please provide a method');
		usersDB.findOne({ id: user }, async (err, data) => {
			if(err) throw err;
			if(!data) return new Error('user not found.');
			if(method === 'push') {
				await data.premiumservers.push(guildID);
				await data.save().catch(error => console.log(error));
				data.save();
			}
			if(method === 'splice') {
				const index = data.premiumservers.indexOf(guildID);
				data.premiumservers.splice(index, 1);
				data.save();
			}
			cachegoose.clearCache();
			return { user };
		});
	},
};
