const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { createError } = require("../error");
const jwt = require("jsonwebtoken");

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

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(404, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    const { password, ...other } = user._doc;
    const expirationTime = 7 * 24 * 60 * 60 * 1000;
    req.token = token;
    console.log(req.token);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: expirationTime,
      })
      .status(200)
      .json({
        user: other,
        token,
      });
  } catch (err) {
    next(err);
  }
};
