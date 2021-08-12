// eslint-disable-next-line import/no-unresolved
const usersModel = require('../models/users');
// eslint-disable-next-line import/no-unresolved
const responseHelper = require('../helpers/response');

// CREATE NEW
const addNewUser = (req, res) => {
  const { body } = req;

  usersModel
    .addNewUser(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updatePassword = (req, res) => {
  const { body, params } = req;

  usersModel.updatePassword(body, params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateProfile = (req, res) => {
  const { params } = req;
  usersModel
    .updateUserName(params.id, params.name)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteUser = (req, res) => {
  const { params } = req;
  usersModel
    .deleteUser(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  addNewUser,
  updatePassword,
  updateProfile,
  deleteUser,
};
