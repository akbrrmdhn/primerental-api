/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const db = require('../database/mysql');

// CREATE NEW
const addNewUser = (body) => new Promise((resolve, reject) => {
  const role_id = 3;
  const gender_id = 1;
  const date_of_birth = new Date();
  const { email, phone, password } = body;
  const getEmail = `SELECT email FROM users WHERE email = ?`;
  db.query(getEmail, email, (err, resultGetEmail) => {
    if (err) return reject(err);
    if (resultGetEmail.length) return reject("emailHandler");
    const getPhone = `SELECT phone FROM users WHERE phone = ?`;
    db.query(getPhone, phone, (err, resultGetPhone) => {
      if (err) return reject(err);
      if (resultGetPhone.length) return reject('phoneHandler');
      bcrypt.genSalt(10, (err, resultSalt) => {
        if (err) return reject("genSalt error");
        bcrypt.hash(password, resultSalt, (err, resultHashPassword) => {
          if (err) return reject('Hash password error');
          const userData = {
            ...body,
            password: resultHashPassword,
            role_id,
            gender_id,
            date_of_birth,
          }
          const registerQuery = `INSERT INTO users SET ?`;
          db.query(registerQuery, userData, (err) => {
            if (err) return reject(err);
            return resolve('User registered');
          });
        });
      });
    });
  });
});

const getUserById = (id) => new Promise((resolve, reject) => {
  const queryString = 'SELECT u.id, u.name, u.image, u.email, u.gender_id, u.phone, u.date_of_birth, u.address from users u WHERE id = ?';
  db.query(queryString, id, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

const editUser = (file, id, body) => new Promise((resolve, reject) => {
  const getFileQuery = 'SELECT image FROM users WHERE id = ?';

  db.query(getFileQuery, id, (err, dbUrl) => {
    if (err) return reject(err);
    let input;

    if (file) {
      const imageUrl = `/images/${file.filename}`;
      input = {
        image: imageUrl,
      };
    }
    if (!file) {
      input = {
        image: dbUrl[0]?.image,
      };
    }

    const newBody = { ...body, ...input };
    const updateQuery = 'UPDATE users SET ? WHERE id = ?';
    db.query(updateQuery, [newBody, id], (err, result) => {
      if (err) return reject(err);
      const getNewQuery = 'SELECT * FROM users WHERE id = ?';
      db.query(getNewQuery, id, (err, res) => {
        if (err) return reject(err);
        const userInfo = {
          user_id: res[0].id,
          name: res[0].name,
          image: res[0].image,
          gender_id: res[0].gender_id,
          email: res[0].email,
          phone: res[0].phone,
          dob: res[0].date_of_birth,
          address: res[0].address,
          roleLevel: res[0].role_id,
        };
        return resolve(userInfo);
      });
    });
  });
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  const queryString = 'DELETE FROM users WHERE id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

module.exports = {
  addNewUser,
  getUserById,
  editUser,
  deleteUser,
};
