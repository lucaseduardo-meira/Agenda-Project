const express = require("express");
const { connectDB } = require("./src/database/server");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

app.set("view engine", "ejs");

app.use("/", require("./src/routes/router"));

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("App listening");
  });
});
