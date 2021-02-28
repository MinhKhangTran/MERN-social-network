import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
// ErrorHandler
import { errorHandler } from "./middlewares/errorMiddleware.js";
// connect DB
import connectDB from "./config/db.js";

// Routes imports
import userRoute from "./routes/users.js";
import profileRoute from "./routes/profiles.js";
import postRoute from "./routes/posts.js";
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

// User-Routes
app.use("/api/a1/users", cors(), userRoute);
// Profile-Routes
app.use("/api/a1/profiles", cors(), profileRoute);
// Post-Routes
app.use("/api/a1/posts", cors(), postRoute);

// errorHandler
app.use(errorHandler);

// Port and start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server rennt auf port ${PORT}`.blue.inverse);
});
