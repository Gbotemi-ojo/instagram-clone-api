const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comment = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: false },
    comment: { type: String },
    likes: { type: Schema.Types.ObjectId, ref: "commentLike", required: false },
    reply : {type : String},
    date_posted: {type: Date}
});

module.exports = mongoose.model("comment", comment);