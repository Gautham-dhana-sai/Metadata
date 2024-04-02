const express = require("express");
const Joi = require("joi");

const jwtAuth = require("../Library/auth");

const User = require("../Models/user");

const SignupRoutes = express.Router();

SignupRoutes.post("/signup/user", async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().optional().allow(null, ""),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email: body.email,
      password: body.password,
      username: body.username,
    });
    await newUser.save();
    res.status(200).json({ response: "done" });
  } catch (error) {
    console.log(error);
  }
});

SignupRoutes.post("/signup/check/password", jwtAuth, async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().optional().allow(null, ""),
    email: Joi.string().optional().allow(null),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    let user = {};
    if (body.username) {
      user = await User.findOne({ username: body.username });
      console.log(user);
    } else if (body.email) {
      user = await User.findOne({ email: body.email });
      console.log(user);
    } else {
      console.log("username or email required");
    }
    if (user.password) {
      res.status(200).json({ response: user });
    } else {
      res.status(403).json({ response: "data not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = SignupRoutes;
