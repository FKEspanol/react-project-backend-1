const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
const LOCAL_URI = "mongodb://127.0.0.1:27017";

const connectDB = async () => {
  try {
    mongoose.connect(LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
