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

client.get('reload_count').then((res) => {
  console.log(res)
  if(!res){
    client.set('reload_count', 1)
  } else {
    client.set('reload_count', +res + 1)
  }
})

module.exports = client;
