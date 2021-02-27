import { check } from "express-validator";

export const registerValidator = [
  check("name", "Name ist nötig").not().isEmpty(),
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 }),
];

export const loginValidator = [
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 }),
];
