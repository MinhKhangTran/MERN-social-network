import asyncHandler from "express-async-handler";
// Model
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Post from "../models/Post.js";
// normalize
import normalize from "normalize-url";

// @desc    Get current user profile
// @route   GET /api/a1/profiles/me
// @access  private
export const getCurrentProfile = asyncHandler(async (req, res) => {
  // suche nach profile mit kriterium user, populate => get name and avatar from the user
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "User",
    ["name", "avatar"]
  );
  if (!profile) {
    res.status(400);
    throw new Error("Es gibt noch kein Profile zu diesem User");
  }
  res.status(200).json(profile);
});

// @desc    Update or create a user profile
// @route   POST /api/a1/profiles
// @access  private
export const createProfiles = asyncHandler(async (req, res) => {
  // destructure the request
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  //   profile
  const profileFields = {
    // user,website,skills
    user: req.user.id,
    website:
      website && website !== "" ? normalize(website, { forceHttps: true }) : "",
    skills: Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => " " + skill.trim()),
    ...rest,
  };
  //   social
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };
  // normalize sociallinks
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) {
      socialFields[key] = normalize(value, { forceHttps: true });
    }
  }
  //   add to profile
  profileFields.social = socialFields;

  //   update bzw create profile von db
  let profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true, setDefaultsOnInser: true }
  );
  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(400);
    throw new Error("Fehler beim erstellen");
  }
});

// @desc    Get all profiles
// @route   GET /api/a1/profiles
// @access  public
export const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (profiles) {
    res.status(200).json(profiles);
  } else {
    res.status(400);
    throw new Error("Fehler");
  }
});

// @desc    Get profile by ID
// @route   GET /api/a1/profiles/:id
// @access  public
export const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id).populate("user", [
    "name",
    "avatar",
  ]);
  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(400);
    throw new Error("Fehler");
  }
});

// @desc    Get github name
// @route   GET /api/a1/profiles/github/:username
// @access  public
// export const getUserRepos = asyncHandler(async (req, res) => {
//   const uri = encodeURI(
//     `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
//   );
//   const headers = {
//     "user-agent": "node.js",
//     Authorization: `token ${config.get("githubToken")}`,
//   };

//   const gitHubResponse = await axios.get(uri, { headers });
//   return res.json(gitHubResponse.data);
// });

// @desc    Delete profile by ID
// @route   DELETE /api/a1/profiles/:id
// @access  private
export const deleteProfile = asyncHandler(async (req, res) => {
  // remove all models from db
  await Promise.all([
    Post.deleteMany({ user: req.user.id }),
    Profile.findOneAndRemove({ user: req.user.id }),
    User.findOneAndRemove({ _id: req.user.id }),
  ]);
  res.json({ msg: "Benutzer wurde gelöscht!" });
});

// @desc    Update profile exprience
// @route   PUT /api/a1/profiles/exp
// @access  private
export const updateExp = asyncHandler(async (req, res) => {
  //   console.log(req.user.id);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience.unshift(req.body);
  await profile.save();
  res.json(profile);
});

// @desc    Delete a profile exprience
// @route   DELETE /api/a1/profiles/exp/:id
// @access  private
export const deleteExp = asyncHandler(async (req, res) => {
  //   console.log(req.user.id);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience = profile.experience.filter(
    (exp) => exp._id.toString() !== req.params.id
  );

  await profile.save();
  res.json(profile);
});

// @desc    Update profile education
// @route   PUT /api/a1/profiles/edu
// @access  private
export const updateEdu = asyncHandler(async (req, res) => {
  //   console.log(req.user.id);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education.unshift(req.body);
  await profile.save();
  res.json(profile);
});

// @desc    Delete a profile education
// @route   DELETE /api/a1/profiles/education/:id
// @access  private
export const deleteEdu = asyncHandler(async (req, res) => {
  //   console.log(req.user.id);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education = profile.education.filter(
    (edu) => edu._id.toString() !== req.params.id
  );

  await profile.save();
  res.json(profile);
});
