const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/response");

//CREATE NEW
const addNewVehicle = (req, res) => {
    const { body } = req;

    vehiclesModel
    .addNewVehicle(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getAllVehicles = (req, res) => {
    vehiclesModel
    .getAllVehicles()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const findVehicle = (req, res) => {
    const { query } = req;
    let inputValue = `%${query.name || ""}%`;
    vehiclesModel
    .findVehicle(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const updateVehicleRating = (req, res) => {
    const { params } = req;
    vehiclesModel
    .updateVehicleRating(params.id, params.rating)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

const deleteVehicle = (req, res) => {
    const { params } = req;
    vehiclesModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
}

module.exports = {
    addNewVehicle,
    getAllVehicles,
    findVehicle,
    updateVehicleRating,
    deleteVehicle
}