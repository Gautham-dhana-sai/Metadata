const express = require("express");
const Joi = require("joi");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const Audio = require("../Models/audio");

const YTDLRoutes = express.Router();

YTDLRoutes.post("/ytdl/test", async (req, res) => {
  const schema = Joi.object({
    url: Joi.string().optional().allow(null, ""),
    videoID: Joi.string().optional().allow(null, ""),
  });
  try {
    const { error, value: body } = schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    let videoID;
    if (body.url) {
      videoID = await ytdl.getURLVideoID(body.url);
    } else {
      videoID = body.videoID;
    }
    const info = await ytdl.getInfo(videoID);
    // const formats = ytdl.filterFormats(info.formats, "audioonly");
    // const leastAudio = ytdl.chooseFormat(info.formats, {
    //   quality: "lowestaudio",
    // });
    console.log(info.videoDetails);
    const filepath = path.join(
      "src/Audios",
      info.videoDetails.title.split("|")[0].split(" ").join("_") + ".mp4"
    );
    ytdl
      .downloadFromInfo(info, { quality: "lowestaudio" })
      .pipe(fs.createWriteStream(filepath));
    const audio = new Audio({
      path: filepath,
      name: info.videoDetails.title.split("|")[0],
      artist: info.videoDetails.author.name,
      videoUrl: info.videoDetails.video_url,
    });
    await audio.save();
    res.json({ response: "file saved successfully!!" });
    res.end();
  } catch (error) {
    console.log(error);
  }
});

YTDLRoutes.get("/ytdl/play/audio", async (req, res) => {
  try {
    const audio = await Audio.findOne({ name: "Karthik's Supremacy Songs" });
    console.log("reaching");
    fs.createReadStream(audio.path).pipe(res);
    console.log("reached");
    // res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = YTDLRoutes;
