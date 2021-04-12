const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const routes = require("./routes");

const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

if (process.env.NODE_ENV !== "production") app.use(cors());
app.use(express.static("build", { extensions: ["html"] }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(routes);

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", () => {
  console.log("a user connected");
});

app.listen(PORT, () => console.log(`🚀 Listening on PORT ${PORT}`));
