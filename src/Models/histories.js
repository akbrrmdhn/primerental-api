const db = require("../database/mysql");

//CREATE NEW
const addNewHistory = (body) => {
    return new Promise((resolve, reject) => {
        const queryString = "INSERT INTO histories SET ?";
        db.query(queryString, body, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

//READ ALL
const getAllHistories = () => {
    return new Promise((resolve, reject) => {
      const queryString =
        'SELECT h.rent_date AS rental_date, h.status AS Payment_Status, u.name AS Patron, v.name AS Rented_vehicle FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id';
      db.query(queryString, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

  const getHistoryById = (id) => {
    return new Promise((resolve, reject) => {
      const queryString =
        'SELECT h.rent_date AS rental_date, h.status AS Payment_Status, u.name AS Patron, v.name AS Rented_vehicle FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id WHERE h.id = ?';
      db.query(queryString, id, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

  const updateHistoryStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      const queryString =
        'UPDATE histories SET status = ? WHERE id = ?';
      db.query(queryString, (id, status), (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };
  
  const deleteHistory = (id) => {
    return new Promise((resolve, reject) => {
      const queryString =
        'DELETE FROM histories WHERE id = ?';
      db.query(queryString, id, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

module.exports = {
    addNewHistory,
    getAllHistories,
    getHistoryById,
    updateHistoryStatus,
    deleteHistory,
}