import express from "express";
// Validations
import { runValidation } from "../validators/index.js";
import {
  createProfileValidator,
  updateExpValidator,
  updateEduValidator,
} from "../validators/profileCheck.js";
// auth Middle
import { protect } from "../middlewares/authMiddleware.js";
// controllers
import {
  getCurrentProfile,
  createProfiles,
  getAllProfiles,
  getProfileById,
  updateExp,
  deleteExp,
  updateEdu,
  deleteEdu,
  //   getUserRepos,
} from "../controllers/profiles.js";

const router = express.Router();
router.route("/me").get(protect, getCurrentProfile);
router
  .route("/")
  .post(protect, createProfileValidator, runValidation, createProfiles)
  .get(getAllProfiles);
router.route("/:id").get(getProfileById);
// exp
router.route("/exp").put(protect, updateExpValidator, runValidation, updateExp);
router.route("/exp/:id").delete(protect, deleteExp);
// education
router.route("/edu").put(protect, updateEduValidator, runValidation, updateEdu);
router.route("/edu/:id").delete(protect, deleteEdu);
// github
// router.route("/github/:username").get(getUserRepos);
export default router;
