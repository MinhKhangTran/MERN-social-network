import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ein Name ist nötig"],
    },
    email: {
      type: String,
      required: [true, "Eine Email ist nötig"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Ein Password ist nötig"],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hashing password
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.JWT_SECRET, salt);
    user.password = hash;
  }
  next();
});

// compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  let user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.Model("user", userSchema);
export default User;
