const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String},
  date: { type: Date, default: Date.now },
  number : {type: Number},
});

const Videos = mongoose.model("Videos", videosSchema);
module.exports = Videos;