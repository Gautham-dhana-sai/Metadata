const redis = require("redis");
const { promisify } = require('util');

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

client.connect();

client.set('new', 'yes')
client.get('new').then((res) => {
  console.log(res)
})

client.hSet('new:1', {
  type: 'bad', mad: 'good'
})
client.hGetAll('new:1').then((res) => {
  console.log(res)
})
client.hGet('new:1', 'data').then((res) => {
  console.log(res)
})

client.keys('*').then((res) => {
  console.log(res)
})

module.exports = client;
