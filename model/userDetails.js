const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetails = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
    profilePicture: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    bio: { type: String, require: false },
    followers: { type: Array, require: false },
    following: { type: Array, require: false },
    verified: { type: Boolean, require: false }
});

module.exports = mongoose.model("userDetail", userDetails);