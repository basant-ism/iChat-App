const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    console.log(name);
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    console.log(message);
    socket.broadcast.emit("receive", {
      name: users[socket.id],
      message: message,
    });
  });
  socket.on("disconnect", (data) => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});
