const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
const adminRoute = require("./routes/Admin/adminRoute");
const userRoute = require("./routes/User/userRoute");
const lobbyRoute = require("./routes/Lobby/lobbyRoute");
const apiRoute = require("./routes/Api/apiRoute");
const veriRoute = require("./routes/Verification/verificationRoute");

app.use(cors());
app.use(express.json());

const routes = [adminRoute, userRoute, lobbyRoute, apiRoute, veriRoute];

routes.forEach((route) => route.routesInit(app));

const onlineUsers = new Set();

io.on("connection", (socket) => {
  onlineUsers.add(socket);

  io.emit("userCount", onlineUsers.size);

  socket.on("disconnect", () => {
    onlineUsers.delete(socket);
    io.emit("userCount", onlineUsers.size);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
    socket.emit("message", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server - running.");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB - connected.");
  })
  .catch((err) => {
    console.log(err);
  });
