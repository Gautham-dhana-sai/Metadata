const express = require("express");

const Audio = require("../Models/audio");
const Test = require("../Models/test");

const jwtAuth = require("../Library/auth");

const TestingRoutes = express.Router();

TestingRoutes.get("/using", jwtAuth, async (req, res) => {
  try {
    console.log("api using");
    const test = new Test({
      testing: "done",
    });
    await test.save();
    res.status(200).json({ response: "Done" });
    res.end();
  } catch (err) {
    // console.log(err);
    res.status(403).json(err);
  }
});

TestingRoutes.get("/", jwtAuth, async (req, res) => {
  try {
    console.log("hit works");
    const data = await Test.find();
    // console.log(data);
    // res.write("<h1>Hello</h1>");
    res.status(200).json({ response: data });
    res.end();
  } catch (err) {
    // console.log(err);
    res.status(404).json(err);
  }
});
module.exports = TestingRoutes;
