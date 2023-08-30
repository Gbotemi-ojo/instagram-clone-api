const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const followers = new Schema({
    followers: { type: Schema.Types.ObjectId, ref: "user", required: false },
});

module.exports = mongoose.model("follower", followers);