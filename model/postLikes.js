const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postLike = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: false },
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
});

module.exports = mongoose.model("postLike", postLike);