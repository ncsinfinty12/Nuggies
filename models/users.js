const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersDB = new Schema({
	id: {
		type: String,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	blacklisted: {
		type: Boolean,
		default: false,
	},
	blacklisted_reason: {
		type: String,
		default: 'null',
	},
	is_afk: {
		type: Boolean,
		default: false,
	},
	afkReason: {
		type: String,
		default: 'null',
	},
});

module.exports = mongoose.model('usersDB', usersDB);