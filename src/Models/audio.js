const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AudioSchema = new Schema({
  data: String,
  name: String,
  artist: String,
});

const Audio = mongoose.model("audio", AudioSchema, "audio");
Audio.createCollection();

module.exports = Audio;
