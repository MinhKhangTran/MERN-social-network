import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
// ErrorHandler
import { errorHandler } from "./middlewares/errorMiddleware";
// connect DB
import connectDB from "./config/db.js";
// config .env
dotenv.config();

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

// errorHandler
app.use(errorHandler);

// Port and start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server rennt auf port ${PORT}`.blue.inverse);
});
