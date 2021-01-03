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
    var dicesArray1 = data.dicesArray;
    console.log(dicesArray1);
    io.emit("rollreturn", {
      dicesArray2: dicesArray1,
    });
  });

  socket.on("bankIt", function (data) {
    io.emit("bankReturn", data);
  });

  socket.on("clearBank", function (data) {
    io.emit("clearBankReturn", data);
  });

  socket.on("bankTile", function (data) {
    var tileId = data.tileId;
    console.log(tileId);
    io.emit("bankTileReturn", data);
  });
});
