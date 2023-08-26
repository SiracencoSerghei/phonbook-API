const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use...." });
    return;
  }

  const avatar = gravatar.url(email);

  const newUser = new User({
    name,
    email,
    password,
    avatar,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      name,
      email,
    },
    token,
  });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong!" });
    return;
  }

  const compareResult = await user.comparePassword(password);

  if (!compareResult) {
    res.status(401).json({ message: "Email or password is wrong!" });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: {
      name: user.name,
      email,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { user } = req;

  await User.findByIdAndUpdate(user.id, { token: "" });

  res.sendStatus(204);
};

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({ name, email });
};

const changeUserAvatar = async (req, res) => {
  console.log("req.file", req.file);

  if (!req.file) {
    res.status(400).json({ message: "file is required!" });
  }

  const { path: temtPath, originalname } = req.file;

  const { _id } = req.user;

  const newAvatarname = `${_id}-${originalname}`;

  const destanationPath = path.join(
    __dirname,
    "..",
    "public",
    "avatars",
    newAvatarname
  );

  await fs.rename(temtPath, destanationPath);

  const pathForRes = path.join("avatars", newAvatarname);

  await User.findByIdAndUpdate(_id, { avatar: pathForRes });

  res.json({ avatar: pathForRes });
};

module.exports = {
  signUp,
  logIn,
  logout,
  getCurrent,
  changeUserAvatar,
};
