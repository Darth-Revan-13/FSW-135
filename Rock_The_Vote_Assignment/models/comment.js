const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    // issueID: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Issue",
    //     required: true
    // },
    // userID: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    text: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model("Comment", commentSchema);