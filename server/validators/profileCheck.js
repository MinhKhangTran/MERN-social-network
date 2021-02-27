import { check } from "express-validator";

export const createProfileValidator = [
  check("status", "Status ist nötig").not().isEmpty(),
  check("skills", "Fähigkeiten sind nötig").not().isEmpty(),
];

export const updateExpValidator = [
  check("title", "Titel ist nötig").not().isEmpty(),
  check("company", "Firma ist nötig").not().isEmpty(),
  check("from", "Das von datum ist nötig und muss in der Vergangenheit sein")
    .not()
    .isEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
];
export const updateEduValidator = [
  check("school", "Schule ist nötig").not().isEmpty(),
  check("degree", "Abschulss ist nötig").not().isEmpty(),
  check("fieldofstudy", "Lerngebiet ist nötig").not().isEmpty(),
  check("from", "Das von datum ist nötig und muss in der Vergangenheit sein")
    .not()
    .isEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
];
