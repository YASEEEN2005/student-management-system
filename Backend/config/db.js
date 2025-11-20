const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Error", error);
  }
}

module.exports = connectDb ;