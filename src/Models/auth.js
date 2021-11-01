/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database/mysql');

const login = ({ email, password }) => new Promise((resolve, reject) => {
  const getPassQs = 'SELECT * FROM users WHERE email = ?';
  db.query(getPassQs, email, (err, result) => {
    if (err) return reject(err);
    if (!result.length) return reject('Email not found.');
    const roleLevel = result[0].role_id;
    bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
      if (err) return reject(err);
      if (!isPasswordValid) return reject('Login Failed.');
      const payload = {
        user_id: result[0].id,
        name: result[0].name,
        roleLevel,
      };
      const userInfo = {
        user_id: result[0].id,
        name: result[0].name,
        image: result[0].image,
        gender_id: result[0].gender_id,
        email: result[0].email,
        phone: result[0].phone,
        dob: result[0].date_of_birth,
        address: result[0].address,
        roleLevel,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: '60m',
          issuer: 'Arkademy',
        },
        (err, token) => {
          if (err) return reject(err);
          const queryToken = `INSERT INTO active_token (token, time_issued) VALUES("${token}", ${Date.now()})`;
          db.query(queryToken, (err, result) => {
            if (err) return reject(err);
            return resolve({ token, userInfo: userInfo});
          });
        },
      );
    });
  });
});

const logout = (body) => new Promise((resolve, reject) => {
  const queryLogout = `DELETE FROM active_token WHERE token = "${body.token}"`;
  db.query(queryLogout, (err, result) => {
    if (err) return reject(err);
    return resolve("Logged out successfully.");
  });
});

const clear = (req) => {
  return new Promise((resolve, reject) => {
    const queryClear = `DELETE FROM active_token WHERE ${Date.now()}-time_issued>60*60*1000`;
    db.query(queryClear, (err, result) => {
      if (err) return reject(err);
      return resolve("Expired Token Cleared!");
    });
  });
};

const checkToken = (req) => {
  return new Promise((resolve, reject) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) return reject("You're not logged in yet.");
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        const queryDelete = `DELETE FROM active_token WHERE token = ?`;
        db.query(queryDelete, token, (err, result) => {
          if (err) return reject(err);
          else return reject("Token has expired, please login again");
        });
      } else {
        const query = `SELECT token FROM active_token WHERE token = ?`;
        db.query(query, token, (err, result) => {
          if (err) return reject(err);
          if (!result.length) return reject("Please login again.");
          return resolve("Token valid.");
        });
      }
    });
  });
};

module.exports = {
  login,
  logout,
  clear,
  checkToken,
};
