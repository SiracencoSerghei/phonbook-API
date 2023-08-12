const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use...." });
    return;
  }
  const newUser = new User({
    name,
    email,
    password,
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

module.exports = {
  signUp,
  logIn,
  logout,
  getCurrent,
};
