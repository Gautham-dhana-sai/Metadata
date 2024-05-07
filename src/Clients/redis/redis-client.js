const redis = require("redis");

const redis_url = process.env.REDIS_URL;
const redis_port = process.env.REDIS_PORT;

const client = redis.createClient({
  host: "127.0.0.1",
  port: redis_port,
});

client.on("error", (error) => {
  console.log(redis_url);
  console.log("error connecting redis", error);
});
// if (!client.isOpen()) {
client.connect();
// }
client.on("connect", () => {
  console.log("connecting");
  module.exports = client;
});

console.log(client.connected);
