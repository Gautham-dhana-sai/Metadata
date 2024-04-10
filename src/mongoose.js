const mongoose = require("mongoose");

require("dotenv").config();

const IP = process.env.MONGO_IP;
const PORT = process.env.MONGO_PORT;
const DB = process.env.MONGO_DB;

const mongoUrl = `mongodb://${IP}:${PORT}/${DB}`;
try {
  mongoose.connect(mongoUrl, {});
  console.log("connected");
} catch (error) {
  console.log(error);
  handleError(error);
}
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});

module.exports = mongoose;
