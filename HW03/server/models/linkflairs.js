// LinkFlair Document Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LinkFlairSchema = new Schema({
  content: { type: String, required: true, maxLength: 30 },
  url: { type: String },
});

module.exports = mongoose.model("LinkFlair", LinkFlairSchema);
