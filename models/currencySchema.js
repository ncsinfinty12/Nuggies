const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	userID: String,
	nuggets : Number,
	fridge: Number,
	commands: Number,
});
module.exports = mongoose.model('currency', Schema);