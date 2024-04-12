const mongoose = require("../mongoose");

const Schema = mongoose.Schema;
const OtpSchema = new Schema({
  email: String,
  otp: String,
  expiry: String,
  status: Number,
  created_at: String,
  updated_at: String,
});

const Otp = mongoose.model("otp", OtpSchema, "otp");

Otp.createCollection();

module.exports = Otp;
