const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, minLength: 3, maxLength: 50 },
    password: { type: String, require : true },
    email: { type: String, require : true },
    fullName : {type:String, require: true},
    // userDetails: { type: Schema.Types.ObjectId, ref: "userDetail", required: false, default : '' },
});

module.exports = mongoose.model("user", user);