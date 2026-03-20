import User from "../models/User.js";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.json({
      message: "User exists",
    });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
  });

  res.json({
    token: generateToken(user._id),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      message: "No user",
    });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.json({
      message: "Wrong password",
    });

  res.json({
    token: generateToken(user._id),
  });
};
