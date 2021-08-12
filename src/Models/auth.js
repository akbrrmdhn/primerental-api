/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database/mysql');

const login = ({ email, password }) => new Promise((resolve, reject) => {
  const getPassQs = 'SELECT name, password FROM users WHERE email = ?';
  db.query(getPassQs, email, (err, result) => {
    if (err) return reject(err);
    if (!result.length) return reject('Email tidak ditemukan');
    bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
      if (err) return reject(err);
      if (!isPasswordValid) return reject('Login Gagal');
      const payload = {
        name: result[0].name,
        email,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: '3m',
          issuer: 'Arkademy',
        },
        (err, token) => {
          if (err) return reject(err);
          return resolve(token);
        },
      );
    });
  });
});

module.exports = { login };
