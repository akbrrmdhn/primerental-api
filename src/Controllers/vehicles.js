/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
const vehiclesModel = require('../models/vehicles');
const responseHelper = require('../helpers/response');
const db = require('../database/mysql');

const addNewVehicle = (req, res) => {
  const { body } = req;

  vehiclesModel
    .addNewVehicle(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getAllVehicles = (req, res) => {
  const { query } = req;
  vehiclesModel
    .getAllVehicles(query)
    .then(({
      data, count, currentPage, limit,
    }) => {
      const baseURL = 'http://localhost:8000/vehicles';
      const totalData = count[0].total_data;
      const totalPage = Math.ceil(totalData / limit);
      const prevPage = currentPage > 1
        ? `${baseURL}?page=${currentPage - 1}&limit=${limit}`
        : null;
      const nextPage = currentPage < totalPage
        ? `${baseURL}?page=${currentPage + 1}&limit=${limit}`
        : null;
      const info = {
        totalData,
        currentPage,
        totalPage,
        nextPage,
        prevPage,
      };
      responseHelper.success(res, 200, data, info);
    })
    .catch((err) => responseHelper.error(res, 500, err));
};

const findVehicle = (req, res) => {
  const { query } = req;
  const inputValue = `%${query.name || ''}%`;
  vehiclesModel
    .findVehicle(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateVehicle = (req, res) => {
  const { file, params } = req;
  const host = 'http://localhost:8000';
  const imageUrl = `/images/${file.filename}`;
  const input = {
    image: host + imageUrl,
  };
  const updateVehicle = (input, id) => new Promise((resolve, reject) => {
    const updateQs = 'UPDATE vehicle SET ? WHERE id = ?';
    db.query(updateQs, [input, id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
  updateVehicle(input, params.id)
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

module.exports = {
  addNewVehicle,
  getAllVehicles,
  findVehicle,
  updateVehicle,
  deleteVehicle,
};
