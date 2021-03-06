const responseHelper = require("../helper/response");

const validation = (req, res, next) => {
  if (req.fileValidationError) {
    return responseHelper.error(res, 400, req.fileValidationError);
  }
  next();
};

module.exports = validation;
