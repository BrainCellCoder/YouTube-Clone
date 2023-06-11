const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { createError } = require("../error");

exports.signup = async (req, res, next) => {
  try {
    // await User.deleteMany({});
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};
