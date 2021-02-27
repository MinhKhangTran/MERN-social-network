import express from "express";
// Validations
import { runValidation } from "../validators/index.js";
import { registerValidator, loginValidator } from "../validators/userCheck.js";
// auth Middle
import { protect } from "../middlewares/authMiddleware.js";
// controllers
import { login, register, getLoggedUser } from "../controllers/users.js";

const router = express.Router();

// Login
router.route("/login").post(loginValidator, runValidation, login);
// Register
router.route("/register").post(registerValidator, runValidation, register);
// Get logged user
router.route("/me").get(protect, getLoggedUser);

export default router;
