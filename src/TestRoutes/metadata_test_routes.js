const getMetaData = require("metadata-scraper");
const express = require("express");
const Joi = require("joi");

MetaDataTest = express.Router();

MetaDataTest.post("/metadata/test", (req, res) => {
  const schema = Joi.object({
    url: Joi.string().optional().allow(null, ""),
  });
  try {
    const { error, value: body } = schema.validate(req.body);
    if (error) {
      console.log(error);
    }
    getMetaData(body.url).then((data) => {
      console.log(data);
    });
    res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = MetaDataTest;
