const historiesModel = require("../models/histories");
const responseHelper = require("../helpers/response");

//CREATE NEW
const addNewHistory = (req, res) => {
    const { body } = req;

    historiesModel
    .addNewHistory(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};


const getAllHistories = (req, res) => {
    historiesModel
    .getAllHistories()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const getHistoryById = (req, res) => {
    const { params } = req;
    historiesModel
    .getHistoryById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const updateHistoryStatus = (req, res) => {
    const { params } = req;
    historiesModel
    .updateHistoryStatus(params.id, params.status)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const deleteHistory = (req, res) => {
    const { params } = req;
    historiesModel
    .deleteHistory(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

module.exports = {
    addNewHistory,
    getAllHistories,
    getHistoryById,
    updateHistoryStatus,
    deleteHistory
}