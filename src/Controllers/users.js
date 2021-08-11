const usersModel = require("../models/users");
const responseHelper = require("../helpers/response");

//CREATE NEW
const addNewUser = (req, res) => {
    const { body } = req;

    usersModel
    .addNewUser(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};


const getAllUsers = (req, res) => {
    usersModel
    .getAllUsers()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const updateUserName = (req, res) => {
    const { params } = req;
    usersModel
    .updateUserName(params.id, params.name)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const deleteUser = (req, res) => {
    const { params } = req;
    usersModel
    .deleteUser(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

module.exports = {
    addNewUser,
    getAllUsers,
    updateUserName,
    deleteUser
}