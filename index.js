const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("App listening");
});
