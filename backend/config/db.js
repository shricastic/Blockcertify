const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully");
  } catch (error) {
    console(eroor);
    console.log("error connecting database");
    process.exit(1);
  }
}

module.exports = connectDB;
