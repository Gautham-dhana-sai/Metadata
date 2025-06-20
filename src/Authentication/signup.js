const express = require("express");
const Joi = require("joi");
const moment = require("moment");

const jwtAuth = require("../Library/auth");
const { generateOtp } = require("../Library/otp_generate");
const sendMails = require("../Library/mail");

const User = require("../Models/user");
const Otp = require("../Models/otp");

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

    const notVerified = await User.findOne({ email: body.email, status: 0 });
    if (notVerified) {
      return res.status(200).json({ success: true, error: false, verified: false, message: "User not verified!" });
    }

    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(200).json({ success: true, error: false, verified: true, message: "User already exists!" });
    }

    const newUser = new User({
      email: body.email,
      password: body.password,
      username: body.username,
      status: 0,
    });

    const otp = generateOtp();
    const newOtp = new Otp({
      email: body.email,
      otp,
      expiry: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
      status: 1,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    await Otp.deleteMany({ email: body.email, status: { $ne: 2 } });
    const mailData = {
      receiver: body.email,
      subject: "Sign up Verification",
      content: otp + " is your Otp.",
    };
    await sendMails(mailData);
    await newOtp.save();
    await newUser.save();
    res.status(200).json({ response: "OTP sent.", verified: false, success: true, error: false });
  } catch (error) {
    console.log(error);
  }
});

SignupRoutes.post("/signup/verify/otp", async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.string().required(),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    const userOtp = await Otp.findOne({ email: body.email, status: 1 });
    console.log(moment().diff(userOtp.created_at, "hours"), userOtp.created_at);
    if (!(userOtp && userOtp.email && userOtp.otp)) {
      return res.status(200).json({ success: true, error: false, verified: false, message: "No user exists!" });
    }
    if (userOtp.otp != body.otp) {
      return res.status(200).json({ success: true, error: false, verified: false, message: "Wrong Otp." });
    } else if (
      userOtp.otp === body.otp &&
      userOtp.expiry < moment().format("YYYY-MM-DD HH:mm:ss")
    ) {
      return res.status(200).json({ success: true, error: false, verified: false, message: "Otp expired." });
    } else if (
      userOtp.otp === body.otp &&
      userOtp.status === 2 &&
      userOtp.expiry > moment().format("YYYY-MM-DD HH:mm:ss") &&
      user
    ) {
      const response = {
        success: true,
        error: false,
        message: "User already verified.",
        operation: "Login",
        verified: true
      };
      return res.json(encrypt(response));
    } else {
      await User.updateOne({ email: body.email }, { $set: { status: 1 } });
      await Otp.updateOne(
        {
          email: body.email,
          status: 1,
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        { $set: { status: 2 } }
      );
      const mailData = {
        receiver: body.email,
        subject: "Account Verified",
        content: "Your account is verified successfully.",
      };
      await sendMails(mailData);
      return res.status(200).json({ success: true, error: false, verified: true, message: "Verified." });
    }
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

SignupRoutes.post("/resend/otp", async (req, res) => {
  req.body = decrypt(req);
  const Schema = Joi.object({
    mail_id: Joi.string().required(),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    if (error) {
      console.log(error);
      const response = error.details[0];
      return res.json(encrypt(response));
    }

    const user = await UserDetails.findOne({
      mail_id: body.mail_id,
    });
    console.log(user, body.mail_id);
    if (!user) {
      const response = {
        success: true,
        error: false,
        message: "User doesn't exists.",
        otp: false,
      };
      return res.json(encrypt(response));
    }

    const otp = generateOtp();
    const newOtp = new Otp({
      mail_id: body.mail_id,
      otp,
      expiry: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
      status: 1,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    await Otp.deleteMany({ mail_id: body.mail_id, status: { $ne: 2 } });
    const mailData = {
      receiver: body.mail_id,
      subject: "Sign up Verification",
      content: otp + " is your OTP for verification.",
    };
    await sendMails(mailData);
    await newOtp.save();
    const response = {
      success: true,
      error: false,
      message: "new OTP sent.",
      otp: true,
    };
    return res.json(encrypt(response));
  } catch (error) {
    console.log(error);
  }
});

SignupRoutes.post("/change/password", async (req, res) => {
  req.body = decrypt(req);
  const Schema = Joi.object({
    mail_id: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    const { error, value: body } = Schema.validate(req.body);
    if (error) {
      console.log(error);
      const response = error.details[0];
      return res.json(encrypt(response));
    }
    await UserDetails.updateOne(
      { mail_id: body.mail_id },
      { $set: { password: body.password, updated_at: moment().format("YYYY-MM-DD HH:mm:ss")} }
    );
    const response = {
      success: true,
      error: false,
      message: "Password reset successful.",
    };
    console.log(response);
    return res.json(encrypt(response));
  } catch (error) {
    console.log(error);
  }
});

module.exports = SignupRoutes;
