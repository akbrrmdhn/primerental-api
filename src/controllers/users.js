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

const editUser = (req, res) => {
  const { file, user_id, body } = req;
  usersModel
    .editUser(file, user_id, body)
    .then((result) => responseHelper.success(res, "Profile updated successfully", 200, result))
    .catch((err) => responseHelper.error(res, "Profile update error", 500, err));
};

const deleteUser = (req, res) => {
  const { user_id } = req;
  usersModel
    .deleteUser(user_id)
    .then((data) => responseHelper.success(res, "User deleted successfully", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to delete user.", 500, err));
};

module.exports = {
  getUserById,
  editUser,
  deleteUser,
};
