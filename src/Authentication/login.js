const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");

const sendMails = require("../Library/mail");

const LoginRoutes = express.Router();

LoginRoutes.post("/login/user", async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    const user = await User.findOne({ email: body.email });
    if (!user) {
      res.status(200).json({ success: true, error: false, data: {login: false, signup: true, message: "User not found" }});
      return res.end();
    }
    if(user && user.status === 0){
      return res.status(200).json({ success: true, error: false, data: {login: false, signup: true, message: "User not verified" }});
    }
    const validPassword = await user.comparePassword(body.password);
    if (!validPassword) {
      res.status(200).json({ success: true, error: false, data: {login: false, signup: false, message: "Invalid Password" }});
      return res.end();
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    // await sendMails(req);
    res.status(200).json({ success: true, error: false, data: {token, login: true, signup: false, message: 'Logged in successfully.'} });
    return res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = LoginRoutes;
