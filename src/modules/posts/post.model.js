const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
    body: String,
    state: { type: String, enum: ["draft", "published"], default: "draft" },
    read_count: { type: Number, default: 0 },
    reading_time: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
