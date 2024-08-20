const { Schema, model } = require("mongoose");

module.exports = model(
  "Post",
  new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    images: Array,
    content: String,
    createdAt: { type: Date, default: Date.now },
  })
);
