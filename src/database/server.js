const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.Promise = global.Promise;

module.exports = { mongoose, connectDB };
