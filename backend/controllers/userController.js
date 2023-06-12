const { createError } = require("../error");
const User = require("../models/userModel");

exports.updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      return res.status(200).json({
        success: true,
        updatedUser,
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "User deleted!",
      });
    } catch (err) {
      next();
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(createError(400, "User not found!"));
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
exports.subscribe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });
  res.status(200).json({
    success: true,
    message: "Subscription successful!",
  });
};

exports.unsubscribe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });
  res.status(200).json({
    success: true,
    message: "Unsubscription successful!",
  });
};
exports.like = (req, res, next) => {
  res.send("USer ROute");
};
exports.dislike = (req, res, next) => {
  res.send("USer ROute");
};
