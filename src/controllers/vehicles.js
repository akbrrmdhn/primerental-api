/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
const vehiclesModel = require('../models/vehicles');
const responseHelper = require('../helpers/response');
const db = require('../database/mysql');

const addNewVehicle = (req, res) => {
  const { file, body, user_id } = req;

  vehiclesModel
    .addNewVehicle(file, body, user_id)
    .then((data) => responseHelper.success(res, "Successfully added new vehicle.", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to add new vehicle", 500, err));
};

const getVehicles = (req, res) => {
  const { query } = req;
  vehiclesModel
    .getVehicles(query)
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
        responseHelper.success(res, "Fetch vehicles succeed", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Failed to fetch data.", 500, err));
};

const getVehicleById = (req, res) => {
  const { params } = req;
  vehiclesModel
    .getVehicleById(params.id)
    .then((data) => responseHelper.success(res, "Fetch vehicle by ID succeed", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to fetch vehicle by ID", 500, err));
}

const updateVehicle = (req, res) => {
  const { file, params, body } = req;
  vehiclesModel.updateVehicle(file, params.id, body)
    .then((result) => responseHelper.success(res, "Update vehicle by ID succeed", 200, result))
    .catch((err) => responseHelper.error(res, "Failed to update vehicle by ID", 500, err));
};

const deleteVehicle = (req, res) => {
  const { params } = req;
  vehiclesModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, "Delete vehicle by ID succeed", 200, data))
    .catch((err) => responseHelper.error(res, "Failed to delete vehicle", 500, err));
};

const getFavourites = (req, res) => {
  const { query } = req;
  vehiclesModel
    .getFavourites(query)
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
        responseHelper.success(res, "Fetch favourites succeed", 200, info);
      }
    )
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, "No data", 404, err);
        } else {
        responseHelper.error(res, "Failed to fetch data.", 500, err)
        }
      }
    );
};

const likeVehicle = (req, res) => {
  const { query } = req;
  vehiclesModel.likeVehicle(query)
  .then((result) => responseHelper.success(res, "Favourited a vehicle succeed", 200, result))
  .catch((error) => responseHelper.error(res, "Failed to favourite a vehicle", 500, error));
}

const unlikeVehicle = (req, res) => {
  const { query } = req;
  vehiclesModel.unlikeVehicle(query)
  .then((result) => responseHelper.success(res, "Unfavourited a vehicle succeed", 200, result))
  .catch((error) => responseHelper.error(res, "Failed to unfavourite a vehicle", 500, error));
}

module.exports = {
  addNewVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getFavourites,
  likeVehicle,
  unlikeVehicle,
};
