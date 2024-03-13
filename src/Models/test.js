const mongoose = require("../mongoose");

const Schema = mongoose.Schema;
const TestSchema = new Schema({
  testing: String,
});

const Test = mongoose.model("test", TestSchema, "test");

Test.createCollection();

module.exports = Test;
