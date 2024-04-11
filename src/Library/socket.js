const socket = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    socket.on("new", (ios) => {
      console.log(ios, "not");
      socket.emit(ios.type, "not done");
    });
    socket.on("old", (ios) => {
      console.log(ios, "yes");
      socket.emit(ios.type, "yes done");
    });
  });

  io.of('/chat')
    .on('connection', (socket) => {
      socket.on('join', (user) => {
          socket.join(user)
          io.of('/chat').in(user).emit('join', 'successfully joined')
      })

      socket.on('message', ({room, message}) => {
        console.log('came', room)
        io.of('/chat').in(room).emit('message', {room, message})
      })
    })
};

module.exports = { socket };
