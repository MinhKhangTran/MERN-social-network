// Model
import Post from "../models/Post.js";
import User from "../models/User.js";
// asyncHandler
import asyncHandler from "express-async-handler";

// @desc    create a Post
// @route   POST /api/a1/posts
// @access  private
export const createPost = asyncHandler(async (req, res) => {
  res.send("create");
});

// @desc    Get all Posts
// @route   GET /api/a1/posts
// @access  private
export const getPosts = asyncHandler(async (req, res) => {
  res.send("get posts");
});

// @desc    Get a Post by ID
// @route   GET /api/a1/posts/:id
// @access  private
export const getPostById = asyncHandler(async (req, res) => {
  res.send("getPostby id");
});

// @desc    Delete a Post by ID
// @route   DELETE /api/a1/posts/:id
// @access  private
export const deletePost = asyncHandler(async (req, res) => {
  res.send("delete");
});

// @desc    like a Post by ID
// @route   PUT /api/a1/posts/like/:id
// @access  private
export const likePost = asyncHandler(async (req, res) => {
  res.send("like");
});

// @desc    Unlike a Post by ID
// @route   PUT /api/a1/posts/like/:id
// @access  private
export const unlikePost = asyncHandler(async (req, res) => {
  res.send("unlike");
});

// @desc    create a Comment
// @route   POST /api/a1/posts/comment/:id
// @access  private
export const createComment = asyncHandler(async (req, res) => {
  res.send("create Comment");
});

// @desc    Delete a Comment by ID
// @route   DELETE /api/a1/posts/comment/:id/:comment_id
// @access  private
export const deleteComment = asyncHandler(async (req, res) => {
  res.send("delete comment");
});
