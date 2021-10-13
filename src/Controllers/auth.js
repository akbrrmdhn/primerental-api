/* eslint-disable import/no-unresolved */
const userModel = require('../models/users');
const authModel = require('../models/auth');
const responseHelper = require('../helpers/response');

const login = (req, res) => {
  const { body } = req;
  authModel.login(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const register = (req, res) => {
  // CREATE NEW USER
  const { body } = req;
  // HASH PASSWORD
  userModel
    .addNewUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const logout = (req, res) => {
  const { body } = req;
  authModel.logout(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

module.exports = {
  login,
  register,
  logout,
};
