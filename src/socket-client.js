const socket = require("socket.io-client");

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_IP;
console.log(PORT, HOST);
const socketUrl = `http://${HOST}:${PORT}`;
console.log(socketUrl);
const Url = `http://localhost:2000`;
const client = socket.connect(Url);

client.on("new", (data) => {
  console.log(data);
});

(function check() {
  const data = { type: "new", msg: "new message" };
  console.log("check", data);
  client.emit(data.type, data);
})();
