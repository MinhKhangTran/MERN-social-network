import colors from "colors";
import dotenv from "dotenv";
// models
import User from "./models/User.js";
import Profile from "./models/Profile.js";
//import Post from "./models/Post.js"
// connectDB
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Profile.deleteMany();
    // await Post.deleteMany();
    console.log("Alles Zerstört".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit();
  }
};
destroyData();
