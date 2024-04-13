const socketRoom = (io) => {
  io.of("/chat").on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
      io.of("/chat").in(room).emit("join", "successfully joined");
    });

    socket.on("message", ({ room, msg }) => {
      console.log("came", room);
      io.of("/chat").in(room).emit("message", { room, msg });
    });

    socket.on("leave", (room) => {
      socket.leave(room);
      io.of("/chat").in(room).emit("leave", "successfully left");
    });
  });
};

module.exports = { socketRoom };
