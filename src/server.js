const express = require("express")();
const bodyParser = require("body-parser");
const http = require("http");
require("dotenv").config();

const index = require("./index");
const { socket } = require("./Library/socket");

const PORT = process.env.SERVER_PORT;

const server = http.createServer(express);

express.use(bodyParser.json());
express.use(index);

socket(server);

server.listen(PORT, (req, res) => {
  console.log("server started");
});

module.exports = server;
