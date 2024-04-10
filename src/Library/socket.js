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
};

module.exports = { socket };
