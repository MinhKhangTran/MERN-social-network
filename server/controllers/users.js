import asyncHandler from "express-async-handler";
// generate token
import generateToken from "../utils/generateToken.js";
// Model
import User from "../models/User.js";
// normalize and gravatar
import normalize from "normalize-url";
import gravatar from "gravatar";

// @desc    Login a user
// @route   POST /api/a1/users/login
// @access  public
export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400);
    throw new Error("Noch kein User mit dieser Email!");
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Falsches Password");
  }
  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Einloggen");
  }
});

// @desc    Register a user
// @route   POST /api/a1/users/register
// @access  public
export const register = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400);
    throw new Error("Diese Email ist schon vorhanden");
  }
  //   create avatar
  const avatar = normalize(
    gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }),
    { forceHttps: true }
  );
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Registrieren");
  }
});

// @desc    Get logged user
// @route   GET /api/a1/users/me
// @access  private
export const getLoggedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Du hast keine Rechte");
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// Francis token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2EwOWM4MGQ0MmVmNDVmMGI0NDNmMiIsImlhdCI6MTYxNDQxNjM0OCwiZXhwIjoxNjE1MDIxMTQ4fQ.ltJ2NIrpa8Nw53djzZp1LzFzcjnCpOshundvUP7Llhs
// julian token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2I2MWJlZTIwODNiNTFiY2U3M2Y2NSIsImlhdCI6MTYxNDUwNDM4MiwiZXhwIjoxNjE1MTA5MTgyfQ.ZryVo7oxuIXocrP0GLE4U4ySuGTa3RGc24zqs-SrYZ8
