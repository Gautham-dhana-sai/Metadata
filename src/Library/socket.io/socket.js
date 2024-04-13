const { socketRoom } = require("./socket-room");

const socket = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    socket.on("new", (ios) => {
      console.log(ios, "not");
      io.emit(ios.type, "not done");
    });
    socket.on("old", (ios) => {
      console.log(ios, "yes");
      io.emit(ios.type, "yes done");
    });
  });

  socketRoom(io);
};

module.exports = { socket };
