const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentReply = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: false },
    likes: { type: Schema.Types.ObjectId, ref: "commentReplyLike", required: false  },
    reply: { type: String },
    date_posted: { type: Date }
});

module.exports = mongoose.model("comment", commentReply);