const express = require("express");
const yts = require("yt-search");
const Joi = require("joi");

const YTSRoutes = express.Router();
YTSRoutes.post("/yts/test", async (req, res) => {
  const schema = Joi.object({
    search: Joi.string().required(),
  });
  try {
    const { error, value: body } = schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    const result = await (await yts(body.search)).all.slice(0, 5);
    const resp = result.map((vid) => {
      return {
        videoId: vid.videoId,
        title: vid.title,
        thumbnail: vid.thumbnail,
        channel: vid.author.name,
      };
    });
    res.json({ response: resp });
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = YTSRoutes;
