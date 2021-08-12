/* eslint-disable import/no-unresolved */
const db = require('../database/mysql');

// CREATE NEW
const addNewVehicle = (body) => new Promise((resolve, reject) => {
  const queryString = 'INSERT INTO vehicles SET ?';
  db.query(queryString, body, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

// READ ALL
const getAllVehicles = (query) => new Promise((resolve, reject) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 3;
  const offset = limit * (page - 1);
  const countQs = 'SELECT COUNT(*) AS "total_data" FROM vehicles';
  const queryString = 'SELECT * FROM vehicles LIMIT ? OFFSET ?';
  db.query(queryString, [limit, offset], (error, resultGet) => {
    if (error) return reject(error);
    db.query(countQs, (err, resultCount) => {
      if (err) return reject(err);
      return resolve({
        data: resultGet,
        count: resultCount,
        currentPage: page,
        limit,
      });
    });
  });
});

const findVehicle = (inputValue) => new Promise((resolve, reject) => {
  const queryString = 'SELECT * FROM vehicles WHERE name LIKE ?';
  db.query(queryString, inputValue, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

const updateVehicle = (body, id) => new Promise((resolve, reject) => {
  const queryString = 'UPDATE vehicles SET rating = ? WHERE id = ?';
  db.query(queryString, [body, id], (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const deleteVehicle = (id) => new Promise((resolve, reject) => {
  const queryString = 'DELETE FROM vehicles WHERE id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

module.exports = {
  addNewVehicle,
  getAllVehicles,
  findVehicle,
  updateVehicle,
  deleteVehicle,
};
