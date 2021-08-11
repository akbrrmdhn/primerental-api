const db = require("../database/mysql");

//CREATE NEW
const addNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const queryString = "INSERT INTO users SET ?";
        db.query(queryString, body, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

//READ ALL
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const queryString =
        'SELECT * FROM users';
      db.query(queryString, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

  const updateUserName = (id, name) => {
    return new Promise((resolve, reject) => {
      const queryString =
        'UPDATE users SET ? WHERE id = ?';
      db.query(queryString, (id, name), (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };
  
  const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      const queryString =
        'DELETE FROM users WHERE id = ?';
      db.query(queryString, id, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  };

module.exports = {
    addNewUser,
    getAllUsers,
    updateUserName,
    deleteUser
}