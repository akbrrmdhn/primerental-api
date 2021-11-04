// eslint-disable-next-line import/no-unresolved
const usersModel = require('../models/users');
// eslint-disable-next-line import/no-unresolved
const responseHelper = require('../helpers/response');

const getUserById = (req, res) => {
  const { user_id } = req;
  usersModel.getUserById(user_id)
    .then((data) => responseHelper.success(res, "User data fetched", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to fetch user data", 500, err));
};

const updatePassword = (req, res) => {
  const { body, params } = req;

  usersModel.updatePassword(body, params.id)
    .then((data) => responseHelper.success(res, "Password updated successfully", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to update password", 500, err));
};

const forgotPassword = (req, res) => {
  const { body } = req;
  usersModel
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

const checkForgotPassword = (req, res) => {
  const { body } = req;
  usersModel
    .checkForgotCode(body)
    .then((result) => responseHelper.success(res, "Success", 200, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, "err", 404, "Code is invalid");
      }
      return responseHelper.error(res, "Error", 500, err);
    });
};

const changePassword = (req, res) => {
  const { body } = req;
  usersModel
    .changePassword(body)
    .then((result) =>
      responseHelper.success(res, "Password Has Been Changed!", 200, result)
    )
    .catch((err) => {
      responseHelper.error(res, "Error", 500, err);
    });
};

const editUser = (req, res) => {
  const { file, params, body } = req;
  console.log('image:', file);
  usersModel
    .editUser(file, params.id, body)
    .then((result) => responseHelper.success(res, "Profile updated successfully", 200, result))
    .catch((err) => responseHelper.error(res, "Profile update error", 500, err));
};

const deleteUser = (req, res) => {
  const { params } = req;
  usersModel
    .deleteUser(params.id)
    .then((data) => responseHelper.success(res, "User deleted successfully", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to delete user.", 500, err));
};

module.exports = {
  getUserById,
  updatePassword,
  editUser,
  deleteUser,
  forgotPassword,
  checkForgotPassword,
  changePassword,
};
