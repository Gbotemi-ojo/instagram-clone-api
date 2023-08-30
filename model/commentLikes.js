const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commmentLike = new Schema({
    comment: { type: Schema.Types.ObjectId, ref: "comment", required: false },
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
});

module.exports = mongoose.model("commentLike", commmentLike);