const socket = require("socket.io-client");
require("dotenv").config({ path: "../../../.env" });

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_IP;
const socketUrl = `http://${HOST}:${PORT}/chat`;

const client = socket.connect(socketUrl);

client.on('join', (res) => {
    console.log(res)
})

client.on('message', (res) => {
    console.log('got')
    console.log(res)
})

function check() {
    client.emit('join', 123)
    client.emit('message', {room: 1234, message: 'hi'})
}

check()