// Community Document Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  postIDs: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  startDate: { type: Date, required: true, default: Date.now },
  members: [{ type: String, required: true }],
  memberCount: { type: Number },
  url: { type: String },
});

module.exports = mongoose.model("Community", CommunitySchema);
