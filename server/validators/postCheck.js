import { check } from "express-validator";

export const createPostValidator = [
  check("text", "Text ist nötig").not().isEmpty(),
];

export const createCommentValidator = [
  check("text", "Text ist nötig").not().isEmpty(),
];
