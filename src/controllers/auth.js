/* eslint-disable import/no-unresolved */
const userModel = require('../models/users');
const authModel = require('../models/auth');
const responseHelper = require('../helpers/response');

const login = (req, res) => {
  const { body } = req;
  authModel.login(body)
    .then((result) => responseHelper.success(res, "Login succeed", 200, result))
    .catch((err) => {
      if(err === 401)
        return responseHelper.error(res, "Incorrect email or Password", 401, err.message);
      else
       return responseHelper.error(res, "Failed to login", 500, err.message);
    });
};

const register = (req, res) => {
  const { body } = req;
  userModel
    .addNewUser(body)
    .then((result) => responseHelper.success(res, "New user successfully created", 201, result))
    .catch((err) => {
      if (err === "emailHandler") 
        return responseHelper.error(res, "Email already registered", 409, "Indicates that the request could not be processed because of conflict in the current state of the resource");
      if (err === "phoneHandler")
        return responseHelper.error(res, "Phone number already registered", 409, "Indicates that the request could not be processed because of conflict in the current state of the resource");
      else
         return responseHelper.error(res, "Failed to create new user", 500, err.message);
    });
};

const logout = (req, res) => {
  const { token } = req;
  authModel.logout(token)
    .then((result) => responseHelper.success(res, "Logged out successfully", 200, result))
    .catch((err) => responseHelper.error(res, "Failed to logout", 500, err.message));
};

const forgotPassword = (req, res) => {
  const { body } = req;
  authModel
    .forgotPassword(body)
    .then((result) => responseHelper.success(res, "Success", 201, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(
          res,
          "Not Found!",
          404,
          "E-mail not registered"
        );
      }
      return responseHelper.error(res, "Error", 500, err);
    });
};

const checkForgotCode = (req, res) => {
  const { body } = req;
  authModel
    .checkForgotCode(body)
    .then((result) => responseHelper.success(res, "Success", 200, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, "err", 404, "Code is invalid!");
      }
      return responseHelper.error(res, "Error", 500, err);
    });
};

const changePassword = (req, res) => {
  authModel
    .changePassword(req)
    .then((result) =>
      responseHelper.success(res, "Password Has Been Changed!", 200, result)
    )
    .catch((err) => {
      responseHelper.error(res, "Error", 500, err);
    });
};

module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  checkForgotCode,
  changePassword,
};
