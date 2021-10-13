/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
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
const addNewUser = (body) => new Promise((resolve, reject) => {
  const role_id = 3;
  const gender_id = 1;
  const qs = 'INSERT INTO users SET ?';
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return reject(err);
    bcrypt.hash(body.password, salt, (error, hash) => {
      if (error) return reject(error);
      const userData = {
        ...body,
        role_id,
        gender_id,
        password: hash,
      };
      db.query(qs, userData, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
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

const updatePassword = (body, id) => new Promise((resolve, reject) => {
  const { oldPass, newPass } = body;
  const getPassQs = 'SELECT password FROM users WHERE id = ?';
  const updateQs = 'UPDATE users SET ? WHERE id = ?';
  db.query(getPassQs, id, (err, result) => {
    if (err) return reject(err);
    bcrypt.compare(oldPass, result[0].password, (err, isPasswordValid) => {
      if (err) return reject(err);
      if (!isPasswordValid) return reject('Password Salah');
      bcrypt.hash(newPass, 10, (err, hash) => {
        if (err) return reject(err);
        const newPassword = {
          password: hash,
        };
        db.query(updateQs, [newPassword, id], (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      });
    });
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
  updatePassword,
  editUser,
  deleteUser,
};
