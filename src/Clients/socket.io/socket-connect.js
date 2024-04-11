const socket = require("socket.io-client");
require("dotenv").config({ path: "../../../.env" });

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_IP;
const socketUrl = `http://${HOST}:${PORT}`;

const client = socket.connect(socketUrl);

client.on("new", (data) => {
  console.log(data);
});

(function check() {
  const data = { type: "new", msg: "new message" };
  console.log("check", data);
  client.emit(data.type, data);
})();
