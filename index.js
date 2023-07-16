const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");

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

app.use("/login", loginRouter);
app.use("/", homeRouter);

app.listen(3000, () => {
  console.log("App listening");
});
