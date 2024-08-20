const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
