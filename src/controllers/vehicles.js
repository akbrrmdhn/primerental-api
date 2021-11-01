/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
const vehiclesModel = require('../models/vehicles');
const responseHelper = require('../helpers/response');
const db = require('../database/mysql');

const addNewVehicle = (req, res) => {
  const { file, body } = req;

  vehiclesModel
    .addNewVehicle(file, body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicles = (req, res) => {
  const { query, hostname } = req;
  vehiclesModel
    .getVehicles(query, hostname)
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
        responseHelper.success(res, 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicleById = (req, res) => {
  const { params } = req;
  vehiclesModel
    .getVehicleById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const findVehicle = (req, res) => {
  const { query } = req;
  const inputValue = `%${query.name || ''}%`;
  vehiclesModel
    .findVehicle(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateVehicle = (req, res) => {
  const { file, params, body } = req;
  vehiclesModel.updateVehicle(file, params.id, body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteVehicle = (req, res) => {
  const { params } = req;
  vehiclesModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getByScore = (req, res) => {
  const { query } = req;
  vehiclesModel.getByScore(query)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((error) => responseHelper.error(res, 500, error));
};

module.exports = {
  addNewVehicle,
  getVehicles,
  getVehicleById,
  findVehicle,
  updateVehicle,
  deleteVehicle,
  getByScore,
};
