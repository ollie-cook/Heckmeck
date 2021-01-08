const express = require("express");
const fs = require("fs");
const app = express();
const serv = require("http").Server(app);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("express connection");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(process.env.PORT);
console.log("server started");

const io = require("socket.io")(serv, {});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("roll", function (data) {
      var currentDice = data.currentDice; 
      io.emit("rollreturn", {
          currentDiceReturn: currentDice,
      });
  })

  socket.on("moveDie", function (data) {
    io.emit("moveDieReturn", {
      info: data.info,
    })
  });

  socket.on("moveTile", function (data) {
    io.emit("moveTileReturn", {
      info: data.info,
    })
  })

  socket.on("blueDice", function() {
    io.emit("blueDiceReturn",{})
  })
});
