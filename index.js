const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const PORT = 5000;
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./configuration/DataBase");
const app = express();

/* Middleware*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

/*Router*/

app.use("/", require("./routers"));
app.use("*", (req, res, next) => {
  next();
  return res.json({
    message: "Not Path Foud !",
    status: false,
  });
});

/* Server Databse */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started In Port : ${PORT}`);
  });
});
