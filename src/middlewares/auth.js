const jwt = require("jsonwebtoken");
const db = require("../database/mysql");

const responseHelper = require("../helpers/response");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken)
    return responseHelper.error(res, "Unauthorized", 401, "Anda belum login!");
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      const queryDelete = `DELETE FROM active_token WHERE token = "${token}"`;
      db.query(queryDelete, (err) => {
        if (err) return responseHelper.error(res, "SQL Error", 500, err);
        else
          return responseHelper.error(
            res,
            "Forbidden",
            403,
            "Token Expired, Please Sign In Again"
          );
      });
    } else {
      const query = `SELECT token FROM active_token WHERE token = "${token}"`;
      db.query(query, (err, result) => {
        if (err) return responseHelper.error(res, "SQL Error", 500, err);
        if (!result.length)
          return responseHelper.error(
            res,
            "Unauthorized",
            401,
            "Please Sign In Again"
          );
        req.user_id = decoded.user_id;
        req.roleLevel = decoded.roleLevel;
        next();
      });
    }
  });
};

const authAdmin = (req, res, next) => {
  const { roleLevel } = req;
  if (roleLevel !== 1)
    return responseHelper.error(res, "Access denied. Not an admin.", 403, "error msg")
  next();
};

const authMerchant = (req, res, next) => {
  const { roleLevel } = req;
  if (roleLevel !== 1)
    return responseHelper.error(res, "Access denied. Not an admin.", 403, "error msg")
  if (roleLevel !== 2)
    return responseHelper.error(res, "Access denied. Not a merchant.", 403, "error msg")
  next();
};

const authUser = (req, res, next) => {
  const { roleLevel } = req;
  if (roleLevel !== 3)
    return responseHelper.error(res, "Access denied. Not a user.", 403, "error msg")
};

module.exports = {
  checkToken,
  authAdmin,
  authMerchant,
  authUser,
};
