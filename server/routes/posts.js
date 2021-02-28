import express from "express";
// Validations
import { runValidation } from "../validators/index.js";
import {
  createPostValidator,
  createCommentValidator,
} from "../validators/postCheck.js";
// auth Middle
import { protect } from "../middlewares/authMiddleware.js";
// controllers
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
} from "../controllers/posts.js";

const router = express.Router();

router
  .route("/")
  .post(createPostValidator, runValidation, protect, createPost)
  .get(protect, getPosts);
router.route("/:id").get(protect, getPostById).delete(protect, deletePost);
router.route("/like/:id").put(protect, likePost);
router.route("/unlike/:id").put(protect, unlikePost);
router
  .route("/comment/:id")
  .post(createCommentValidator, runValidation, protect, createComment);
router.route("/comment/:id/:comment_id").delete(protect, deleteComment);

export default router;
