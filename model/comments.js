const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comment = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: false },
    comment: { type: String },
    likes: { type: Schema.Types.ObjectId, ref: "commentLike", required: false, default : 0 },
    reply: { type: Schema.Types.ObjectId, ref: "commentReply", required: false, default: 0 },
    date_posted: {type: Date}
});

module.exports = mongoose.model("comment", comment);