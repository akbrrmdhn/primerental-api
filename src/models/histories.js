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
const addNewHistory = (body) => new Promise((resolve, reject) => {
  const payment_code = randomCode(9);
  const booking_code = randomCode(6);
  const newBody = {
    ...body,
    payment_code,
    booking_code,
  };
  const queryString = 'INSERT INTO histories SET ?';
  db.query(queryString, newBody, (err, result) => {
    if (err) return reject(err);
    console.log(result.insertId);
    const historyId = result.insertId;
    return resolve(historyId);
  });
});

// READ ALL
const getAllHistories = (query) => new Promise((resolve, reject) => {
  let user_id = query?.user_id ? `=${query.user_id}` : `>= 0`;
  let owner_id = query?.owner_id ? `=${query.owner_id}` : `>= 0`;
  let keyword = query?.keyword ? query.keyword : '';
  let order_by = query?.order_by ? query.order_by : 'h.id';
  let sort = query?.sort ? query.sort : 'DESC';
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = limit * (page - 1);
  const queryString = `SELECT h.id AS "transaction_id", u.id AS "patron_id", u.name AS "patron_name", v.name AS "vehicle_name", v.owner_id, h.quantity, h.total_price, h.rent_date, h.return_date, rs.name AS payment_status FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id JOIN rent_status rs ON h.status_id = rs.id WHERE user_id${user_id} AND owner_id${owner_id} AND v.name LIKE "%${keyword}%" ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;
  db.query(queryString, (error, result) => {
    if (error) return reject(error);
    if (!result.length) return reject(404);
    const countString = `SELECT COUNT(h.id) AS total_data FROM histories h JOIN vehicles v ON h.vehicle_id = v.id JOIN users u ON h.user_id = u.id WHERE u.id ${user_id} AND v.owner_id ${owner_id}`;
    db.query(countString, (err, countResult) => {
      if (err) return reject(err);
      const totalData = countResult[0].total_data;
      const totalPage = Math.ceil(totalData/limit);
      const baseURL = `/histories?limit=${limit}&`;
      let urlPrevPage = baseURL;
      let urlNextPage = baseURL;
      query.user_id
        && ((urlPrevPage = urlPrevPage + `user_id${user_id}&`),
        (urlNextPage = urlNextPage + `user_id${user_id}&`));
      query.owner_id
        && ((urlPrevPage = urlPrevPage + `owner_id${owner_id}&`),
        (urlNextPage = urlNextPage + `owner_id${owner_id}&`));
      const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
      const nextPage = page < totalPage ? urlNextPage + `page=${page + 1}` : null;
      return resolve({
          result,
          totalData,
          totalPage,
          currentPage: page,
          prevPage,
          nextPage,
        });
    })
  });
});

const getHistoryById = (id) => new Promise((resolve, reject) => {
  const queryString = `SELECT v.id AS 'vehicle_id', u.id AS 'user_id', h.rent_date, h.return_date, h.booking_code, h.payment_code, h.total_price, h.quantity, rs.name AS rent_status, u.name AS patron, u.phone, u.email, v.name AS rented_vehicle, v.image, c.name AS category, l.name AS location FROM histories h JOIN users u ON h.user_id = u.id JOIN vehicles v ON h.vehicle_id = v.id JOIN rent_status rs ON h.status_id = rs.id JOIN locations l ON v.location_id = l.id JOIN categories c ON v.category_id = c.id WHERE h.id = ?`;
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const updateHistory = (body, id) => new Promise((resolve, reject) => {
  const queryString = 'UPDATE histories SET ? WHERE id = ?';
  db.query(queryString, [body, id], (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const deleteHistory = (id) => new Promise((resolve, reject) => {
  const queryString = 'DELETE FROM histories WHERE id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

module.exports = {
  addNewHistory,
  getAllHistories,
  getHistoryById,
  updateHistory,
  deleteHistory,
};
