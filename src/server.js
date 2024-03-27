const express = require("express")();
const bodyParser = require("body-parser");
const http = require("http");

require('dotenv').config()

const PORT = process.env.SERVER_PORT

const index = require("./index");

const server = http.createServer(express);

express.use(bodyParser.json())
express.use(index);

server.listen(PORT, (req, res) => {
  console.log("server started");
});
