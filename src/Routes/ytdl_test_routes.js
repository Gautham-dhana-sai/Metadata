const express = require("express");
const Joi = require("joi");

const YTDLRoutes = express.Router();

YTDLRoutes.post("/ytdl/test", (req, res) => {
  const schema = Joi.object({
    url: Joi.string().optional().allow(null, ""),
  });
  try {
    const { error, value: body } = schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = YTDLRoutes;
