const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { prefix } = require('../utils/config.json');

const guildsDB = new Schema({
	id: String,
	prefix: {
		type: String,
		default: prefix,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	chatbot_enabled: {
		type: Boolean,
		default: false,
	},
	chatbot_channel: {
		type: String,
		default: 'null',
	},
	automeme_enabled: {
		type: Boolean,
		default: false,
	},
	automeme_channel: {
		type: String,
		default: 'null',
	},
	mute_role: {
		type: String,
		default: 'null',
	},
	premium: {
		type: Boolean,
		default: false,
	},

});

module.exports = mongoose.model('guildsDB', guildsDB);