const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const route = require("./routes/route.js");
const connectDB = require("./database/connect.js");

dotenv.config();
const server = express();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "public")));
server.set("view engine", "ejs");
server.set("views", "view");

server.use(route);

server.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
