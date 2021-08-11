const db = require("../database/mysql");

//CREATE NEW
const addNewVehicle = (body) => {
    return new Promise((resolve, reject) => {
        const queryString = "INSERT INTO vehicles SET ?";
        db.query(queryString, body, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

//READ ALL
const getAllVehicles = () => {
    return new Promise((resolve, reject) => {
      const queryString =
        'SELECT * FROM vehicles';
      db.query(queryString, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

const findVehicle = (inputValue) => {
  return new Promise ((resolve, reject) => {
    let queryString = "SELECT * FROM vehicles WHERE name LIKE ?";
    db.query(queryString, inputValue, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

const updateVehicleRating = (body, id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'UPDATE vehicles SET rating = ? WHERE id = ?';
    db.query(queryString, [body, id], (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'DELETE FROM vehicles WHERE id = ?';
    db.query(queryString, id, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

module.exports = {
    addNewVehicle,
    getAllVehicles,
    findVehicle,
    updateVehicleRating,
    deleteVehicle
}