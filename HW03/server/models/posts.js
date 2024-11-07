// Post Document Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true },
  linkFlairID: { type: Schema.Types.ObjectId, ref: "LinkFlair" },
  postedBy: { type: String, required: true },
  postedDate: { type: Date, required: true, default: Date.now },
  commentIDs: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, required: true, default: 0 },
  url: { type: String },
});

module.exports = mongoose.model("Post", PostSchema);
