const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AudioSchema = new Schema({
  path: String,
  name: String,
  artist: String || null,
  videoUrl: String || null,
});

const Audio = mongoose.model("audio", AudioSchema, "audio");
Audio.createCollection();

module.exports = Audio;
