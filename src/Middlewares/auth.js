/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');

const responseHelper = require('../helpers/response');

const checkToken = (req, res, next) => {
  const bearerToken = req.header('x-access-token');
  if (!bearerToken) { return responseHelper.error(res, 401, 'Silahkan Login Terlebih Dahulu'); }

  const token = bearerToken.split(' ')[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { issuer: 'Arkademy' },
    (err, payload) => {
      if (err) return responseHelper.error(res, 401, err);
      req.payload = payload;
      next();
    },
  );
};

const authAdmin = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error (responseHelper.error(res, 401, err));
    req.payload = payload;
    if(payload.roleLevel !== 1)
      return new Error(responseHelper.error(res, 403, "Access denied. Not an admin."));
    next();
  });
};

const authMerchant = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error (responseHelper.error(res, 401, err));
    req.payload = payload;
    if(payload.roleLevel !== 1)
      if(payload.roleLevel !== 2)
        return new Error(responseHelper.error(res, 403, "Access denied. Not a merchant."));
    next();
  });
};

const authUser = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error (responseHelper.error(res, 401, err));
    req.payload = payload;
    if(payload.roleLevel !== 1)
      if(payload.roleLevel !== 3)
        return new Error(responseHelper.error(res, 403, "Access denied. Not a user."));
    next();
  });
};

module.exports = {
  checkToken,
  authAdmin,
  authMerchant,
  authUser,
};
