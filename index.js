const express = require("express");
const { connectDB } = require("./src/database/server");
const dotenv = require("dotenv");

const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/login", loginRouter);
app.use("/", homeRouter);

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("App listening");
  });
});
