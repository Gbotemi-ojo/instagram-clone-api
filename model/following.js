const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const following = new Schema({
    following: { type: Schema.Types.ObjectId, ref: "user", required: false },

});

module.exports = mongoose.model("following", following);