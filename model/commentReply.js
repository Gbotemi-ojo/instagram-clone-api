const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentReply = new Schema({
    originalComment: { type: Schema.Types.ObjectId, ref: "comment", required: false },
    likes: { type: Schema.Types.ObjectId, ref: "commentReplyLike", required: false },
    comment : {type : String},
    date_posted: { type: Date }
});

module.exports = mongoose.model("commentReply", commentReply);