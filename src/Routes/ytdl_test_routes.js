const express = require("express");
const Joi = require("joi");
const ytdl = require("ytdl-core");

const YTDLRoutes = express.Router();

YTDLRoutes.post("/ytdl/test", async (req, res) => {
  const schema = Joi.object({
    url: Joi.string().optional().allow(null, ""),
  });
  try {
    const { error, value: body } = schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    const videoID = await ytdl.getURLVideoID(body.url);
    console.log(await ytdl.getInfo(videoID));
    res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = YTDLRoutes;
