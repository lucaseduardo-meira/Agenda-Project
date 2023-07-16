const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const loginRoute = require("./routes/login");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Working");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/login", loginRoute);

app.listen(3000, () => {
  console.log("App listening");
});
