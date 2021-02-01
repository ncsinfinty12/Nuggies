const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	GuildID: String,
	UserID: String,
	Punishments: Array,
});
module.exports = mongoose.model('warnings', Schema);