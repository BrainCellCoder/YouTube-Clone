const { createError } = require("../error");
const User = require("../models/userModel");
const Video = require("../models/videoModel");

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

exports.like = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId }, //$addToSet confirms that the userId is pushed only once in the likes array.(Avoid duplication)
      $pull: { dislikes: userId },
    });
    res.status(200).json({
      succes: true,
      message: "Video liked!",
    });
  } catch (err) {
    next(err);
  }
};

exports.dislike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    res.status(200).json({
      succes: true,
      message: "Video disliked!",
    });
  } catch (err) {
    next(err);
  }
};
