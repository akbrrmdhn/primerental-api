/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const db = require('../database/mysql');

const login = ({ email, password }) => new Promise((resolve, reject) => {
  const getPassQs = 'SELECT * FROM users WHERE email = ?';
  db.query(getPassQs, email, (err, result) => {
    if (err) return reject(err);
    if (!result.length) return reject(401);
    const roleLevel = result[0].role_id;
    bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
      if (err) return reject(err);
      if (!isPasswordValid) return reject(401);
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
          issuer: 'primerental',
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

const logout = (token) => new Promise((resolve, reject) => {
  const queryLogout = `DELETE FROM active_token WHERE token = "${token}"`;
  db.query(queryLogout, (err, result) => {
    if (err) return reject(err);
    return resolve("Logged out successfully.");
  });
});

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const getEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const min = Math.ceil(111111);
      const max = Math.floor(999999);
      const code = Math.floor(Math.random() * (max - min) + min);
      const postCodeQuery =
        "INSERT INTO forgot_password (email, code) VALUES (? , ?)";
      db.query(postCodeQuery, [result[0].email, code], (err) => {
        if (err) return reject(err);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Reset Code",
          text: `Use this code to reset your password: ${code}`,
        };
        // send email
        transporter.sendMail(mailOptions, (err) => {
          console.log(err);
          if (err) return reject("node mailer error");
          return resolve("code sent to database and email");
        });
      });
    });
  });
};

const checkForgotCode = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email } = body;
    const getEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const email = result[0].email;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        return resolve("Code is valid");
      });
    });
  });
};

const changePassword = (req) => {
  return new Promise((resolve, reject) => {
    const { email } = req.body;
    if (req.body.code) {
      const { code, password } = req.body;
      const getEmailQuery = "SELECT email FROM users WHERE email = ?";
      db.query(getEmailQuery, email, (err, result) => {
        if (err) return reject(err);
        const email = result[0].email;
        const checkCodeQuery =
          "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
        db.query(checkCodeQuery, [email, code], (err, res) => {
          if (err) return reject(err);
          if (!res.length) return reject(404);
          const updatePassQuery = "UPDATE users SET ? WHERE email = ?";
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) return reject("Bcrypt hash password error");
            const newPassword = {
              password: hash,
            };
            db.query(updatePassQuery, [newPassword, email], (err) => {
              if (err) return reject(err);
              return resolve("Password sudah diganti");
            });
          });
        });
      });
    }
    if (req.user_id) {
      const { user_id } = req;
      const { oldPass, newPass } = req.body;
      const getPassQuery = `SELECT password FROM users WHERE id = ${user_id}`;
        db.query(getPassQuery, (err, res) => {
          if (err) return reject(err);
          bcrypt.compare(oldPass, res[0].password, (err, result) => {
            if (err) return reject(err);
            if (!result) return reject(403);
            bcrypt.hash(newPass, 10, (err, hash) => {
              if (err) return reject(err);
              const newPassword = {
                password: hash,
              };
            const updateQuery = `UPDATE users SET ? WHERE id = ${user_id}`;
            db.query(updateQuery, newPassword, (err, result) => {
              if (err) return reject(err);
              return resolve('Password changed');
            });
          });
        });
      });
    }
  });
};

module.exports = {
  login,
  logout,
  forgotPassword,
  checkForgotCode,
  changePassword,
};
