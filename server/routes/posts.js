import express from "express";
// Validations
import { runValidation } from "../validators/index.js";
import { registerValidator, loginValidator } from "../validators/userCheck.js";
// auth Middle
import { protect } from "../middlewares/authMiddleware.js";
// Model
import User from "../models/User.js";

const router = express.Route();

// Login
router.route("/login").post();
router.route("/register").post();
