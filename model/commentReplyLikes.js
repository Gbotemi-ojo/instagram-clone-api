const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentReplyLikes = new Schema({
    commentReply: { type: Schema.Types.ObjectId, ref: "commentReply", required: false },
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
});

module.exports = mongoose.model("commentReplyLike", commentReplyLikes);