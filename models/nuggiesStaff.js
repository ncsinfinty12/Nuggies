const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nuggiesStaff = new Schema({
	_id: {
		type: String,
	},
	Developers: {
		type: Array,
	},
	Moderators: {
		type: Array,
	},
});

module.exports = mongoose.model('nuggiesStaff', nuggiesStaff);