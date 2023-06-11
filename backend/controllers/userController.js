const { createError } = require("../error");
const User = require("../models/userModel");

exports.updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      updatedUser,
    });
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User deleted!",
    });
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
exports.getUser = (req, res, next) => {
  res.send("USer ROute");
};
exports.subscribe = (req, res, next) => {
  res.send("USer ROute");
};

exports.unsubscribe = (req, res, next) => {
  res.send("USer ROute");
};
exports.like = (req, res, next) => {
  res.send("USer ROute");
};
exports.dislike = (req, res, next) => {
  res.send("USer ROute");
};
