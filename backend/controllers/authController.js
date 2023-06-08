const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({ ...req.body, password: hash });
    res.send(newUser);
  } catch (err) {
    console.log(err);
  }
};
