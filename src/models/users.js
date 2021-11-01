/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const db = require('../database/mysql');
const nodemailer = require("nodemailer");

const randomCode = (length) => {
  let result = '';
  const characters = '0123456789';
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
  const getPassQuery = 'SELECT password FROM users WHERE id = ?';
  db.query(getPassQuery, id, (err, res) => {
    if (err) return reject(err);
    bcrypt.compare(oldPass, res[0].password, (err, result) => {
      if (err) return reject(err);
      if (!result) return reject(403);
      bcrypt.hash(newPass, 10, (err, hash) => {
        if (err) return reject(err);
        const newPassword = {
          password: hash,
        };
        const updateQuery = 'UPDATE users SET ? WHERE id = ?';
        db.query(updateQuery, [newPassword, id], (err, result) => {
          if (err) return reject(err);
          return resolve('Password sudah diganti');
        });
      });
    });
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

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email, password } = body;
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
  });
};

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
  forgotPassword,
  checkForgotCode,
  changePassword,
};
