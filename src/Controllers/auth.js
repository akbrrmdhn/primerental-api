/* eslint-disable import/no-unresolved */
const userModel = require('../Models/users');
const authModel = require('../Models/auth');
const responseHelper = require('../helpers/response');

const login = (req, res) => {
  const { body } = req;
  authModel.login(body)
    .then((result) => responseHelper.success(res, 201, { token: result }))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const register = (req, res) => {
  // CREATE NEW USER
  const { body } = req;
  // HASH PASSWORD
  userModel
    .createNewUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  login,
  register,
  logout,
};
