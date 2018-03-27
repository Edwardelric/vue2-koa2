let mongoose = require("mongoose");

let Discover = mongoose.model("users", new mongoose.Schema({
	username: String,
	email: String,
	pwd: String
}, {_id: true}));

module.exports = Discover;