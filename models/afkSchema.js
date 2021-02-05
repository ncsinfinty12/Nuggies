const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	id : String,
	reason: String,
	GuildID: String,
});

module.exports = mongoose.model('afk', Schema);