const mongoose = require("mongoose");

const mongoUrl = "mongodb://mongo:27017/start";
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
