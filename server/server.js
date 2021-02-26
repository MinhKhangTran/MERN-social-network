import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
// config .env
dotenv.config();

// connect DB
import connectDB from "./config/db.js";
connectDB();

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Port and start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server rennt auf port ${PORT}`.blue.inverse);
});
