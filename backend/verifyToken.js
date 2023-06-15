const jwt = require("jsonwebtoken");
const { createError } = require("./error");

exports.verifyToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.cookies.access_token || req.headers.authorization;
  console.log(token);
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(401, "You are not authenticated!"));
    req.user = user;
    next();
  });
};
