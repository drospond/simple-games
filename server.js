require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socket = require('./socket.io/index.js');

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.Server(app);
socket.setUpSocket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
    currentPort: PORT,
  });
});

app.use(express.static("client/build"));

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/simpleGamesDB", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .catch((error) => handleError(error));

const userController = require("./Controllers/userController");
app.use("/api/users", userController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
