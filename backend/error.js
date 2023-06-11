exports.createError = (status, message) => {
  const error = new Error();
  error.success = false;
  error.message = message;
  error.status = status;
  return error;
};
