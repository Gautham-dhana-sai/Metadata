const express = require("express")();
const bodyParser = require("body-parser");
const http = require("http");

const index = require("./index");

const server = http.createServer(express);

express.use(bodyParser.json())
express.use(index);

server.listen(2000, (req, res) => {
  console.log("server started");
});
