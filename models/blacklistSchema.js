const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	userID: String,
});

module.exports = mongoose.model('blacklist', Schema);