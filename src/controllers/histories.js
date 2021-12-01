/* eslint-disable import/no-unresolved */
const historiesModel = require('../models/histories');
const responseHelper = require('../helpers/response');

// CREATE NEW
const addNewHistory = (req, res) => {
  const { body } = req;

  historiesModel
    .addNewHistory(body)
    .then((data) => responseHelper.success(res, "Added new history", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to add new history", 500, err));
};

const getAllHistories = (req, res) => {
  const { query } = req;
  historiesModel
    .getAllHistories(query)
    .then(
      ({ result, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data: result,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, "Fetch histories succeed", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Failed to fetch histories.", 500, err));
};

const getHistoryById = (req, res) => {
  const { params } = req;
  historiesModel
    .getHistoryById(params.id)
    .then((data) => responseHelper.success(res, "Fetched history by id", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to fetch history by id", 500, err));
};

const updateHistory = (req, res) => {
  const { body, params } = req;
  historiesModel
    .updateHistory(query, params.id)
    .then((data) => responseHelper.success(res, "History updated", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to update history", 500, err));
};

const deleteHistory = (req, res) => {
  const { params } = req;
  historiesModel
    .deleteHistory(params.id)
    .then((data) => responseHelper.success(res, "History deleted", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to delete history", 500, err));
};

module.exports = {
  addNewHistory,
  getAllHistories,
  getHistoryById,
  updateHistory,
  deleteHistory,
};
