const db = require('../database/mysql');

const randomCode = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random()
    * charactersLength));
  }
  return result;
};

// CREATE NEW
const addNewHistory = (body) => new Promise((resolve, reject) => {
  const payment_code = randomCode(9);
  const booking_code = randomCode(6);
  const newBody = {
    ...body,
    payment_code,
    booking_code,
  };
  const queryString = 'INSERT INTO histories SET ?';
  db.query(queryString, newBody, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

// READ ALL
const getAllHistories = () => new Promise((resolve, reject) => {
  const queryString = 'SELECT h.rent_date AS rental_date, h.status AS Payment_Status, u.name AS buyer, v.name AS Rented_vehicle FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id';
  db.query(queryString, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const getHistoryById = (id) => new Promise((resolve, reject) => {
  const queryString = 'SELECT h.rent_date AS rental_date, h.status AS Payment_Status, u.name AS Patron, v.name AS Rented_vehicle FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id WHERE h.id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const updateHistoryStatus = (id, status) => new Promise((resolve, reject) => {
  const queryString = 'UPDATE histories SET ? WHERE id = ?';
  db.query(queryString, (id, status), (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const deleteHistory = (id) => new Promise((resolve, reject) => {
  const queryString = 'DELETE FROM histories WHERE id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

module.exports = {
  addNewHistory,
  getAllHistories,
  getHistoryById,
  updateHistoryStatus,
  deleteHistory,
};
