const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const connectDB = async () => {
  try {
    const uri = process.env.ATLAS_URI;
    if (!uri) {
      throw new Error("ATLAS_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
