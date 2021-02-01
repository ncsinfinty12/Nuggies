const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	id : String,
	reason: String,
});

module.exports = mongoose.model('afk', Schema);