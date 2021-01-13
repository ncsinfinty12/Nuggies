const mongoose = require('mongoose');

module.exports = mongoose.model(
	'channel',
	new mongoose.Schema({
		channelID: [],
	}),
);