// Model
import Post from "../models/Post.js";
import User from "../models/User.js";
// asyncHandler
import asyncHandler from "express-async-handler";

// @desc    create a Post
// @route   POST /api/a1/posts
// @access  private
export const createPost = asyncHandler(async (req, res) => {
  //   user ist nur als id, aber andere werte müssen wir von dem User model raus holen
  const user = await User.findById(req.user.id).select("-password");
  // neuer Post
  const newPost = new Post({
    text: req.body.text,
    user: req.user.id,
    name: user.name,
    avatar: user.avatar,
  });
  // save
  const post = await newPost.save();
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Erstellen eines Posts");
  }
});

// @desc    Get all Posts
// @route   GET /api/a1/posts
// @access  private
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400);
    throw new Error("Fehler beim Abrufen der Posts");
  }
});

// @desc    Get a Post by ID
// @route   GET /api/a1/posts/:id
// @access  private
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error("Kein Post mit dieser ID");
  }
});

// @desc    Delete a Post by ID
// @route   DELETE /api/a1/posts/:id
// @access  private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Kein Post mit dieser ID");
  }
  //   check for user!
  if (post.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Dieser Post gehört dir nicht!");
  }
  await post.remove();
  res.status(200).json({ message: "Post wurde gelöscht" });
});

// @desc    like a Post by ID
// @route   PUT /api/a1/posts/like/:id
// @access  private
export const likePost = asyncHandler(async (req, res) => {
  //   finde den post
  const post = await Post.findById(req.params.id);
  // check if there is a like from the user
  const isLiked = post.likes.find(
    (user) => user.user.toString() === req.user.id
  );
  if (!isLiked) {
    post.likes.unshift({ user: req.user.id });
    // need to save!
    await post.save();
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error("Du likest diesen Post schon!");
  }
});

// @desc    Unlike a Post by ID
// @route   PUT /api/a1/posts/like/:id
// @access  private
export const unlikePost = asyncHandler(async (req, res) => {
  //   finde den post
  const post = await Post.findById(req.params.id);
  // check if there is a like from the user
  const isLiked = post.likes.find(
    (user) => user.user.toString() === req.user.id
  );
  if (isLiked) {
    // remove it like usual, overwrite the post.likes array
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    // need to save!
    await post.save();
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error("Du unlikest diesen Post schon!");
  }
});

// @desc    create a Comment
// @route   POST /api/a1/posts/comment/:id
// @access  private
export const createComment = asyncHandler(async (req, res) => {
  //   find post
  const post = await Post.findById(req.params.id);
  // find user for comment
  const user = await User.findById(req.user.id).select("-password");
  // new comment
  const newComment = {
    user: req.user.id,
    name: user.name,
    avatar: user.avatar,
    text: req.body.text,
  };
  post.comments.unshift(newComment);
  // need to save
  await post.save();
  if (newComment) {
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error("Fehler beim Erstellen eines Kommentares");
  }
});

// @desc    Delete a Comment by ID
// @route   DELETE /api/a1/posts/comment/:id/:comment_id
// @access  private
export const deleteComment = asyncHandler(async (req, res) => {
  //   find post
  const post = await Post.findById(req.params.id);
  const specificComment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );
  //   console.log(specificComment);
  if (!specificComment) {
    res.status(400);
    throw new Error("Dieser Kommentar gibt es nicht");
  }
  // check user
  if (req.user.id.toString() !== specificComment.user.toString()) {
    res.status(400);
    throw new Error("Dieser Kommentar gehört dir nicht");
  } else {
    // filtering
    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    // save new post.comment array
    await post.save();
    res.status(200).json(post);
  }
});
