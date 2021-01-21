const mongoose = require('mongoose');

const MuteRoleSchema = new mongoose.Schema({
	MuteRole: {
		type: String,
	},
	GuildID: String,
});

module.exports = mongoose.model('mute-roles', MuteRoleSchema);
