const mongoose = require("mongoose");
const comments = require("./comments");

const Schema = mongoose.Schema;

const post = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
    upload: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    caption : {type : String},
    date_posted: { type: Date },
    likes: { type: Schema.Types.ObjectId, ref: "postLike", required: false,default : 0 },
    comments: { type: Schema.Types.ObjectId, ref: "comment", required: false,default : 0 }
});

module.exports = mongoose.model("post", post);