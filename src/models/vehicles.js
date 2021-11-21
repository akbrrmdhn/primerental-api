/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
const db = require('../database/mysql');

// CREATE NEW
const addNewVehicle = (file, body, user_id) => new Promise((resolve, reject) => {
  const getFileQuery = 'SELECT image FROM vehicles';
  db.query(getFileQuery, (err, dbUrl) => {
    if (err) return reject(err);
    let input;

    if (file) {
      const imageUrl = `/images/${file.filename}`;
      input = {
        image: imageUrl,
        owner_id: user_id,
      };
    }
    if (!file) {
      input = {
        image: dbUrl[0]?.image,
        owner_id: user_id,
      };
    }
    const newBody = { ...body, ...input };
    const insertQuery = 'INSERT INTO vehicles SET ?';
    db.query(insertQuery, newBody, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
});

const getVehicles = (query) => new Promise((resolve, reject) => {
  const keyword = query?.keyword ? query.keyword : '';
  let category_id = '> 0';
  if(query?.category_id) category_id = `=${query.category_id}`;
  let location_id = '> 0';
  if(query?.location_id) location_id = `=${query.location_id}`;
  let order_by = query?.order_by ? query.order_by : 'id';
  let sort = query?.sort ? query.sort : 'ASC';
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 4;
  const offset = limit * (page - 1);
  const queryString = `SELECT v.id AS id, v.name AS name, v.image, v.description, v.category_id, l.name AS location, v.price, v.score AS score FROM vehicles v JOIN locations l ON v.location_id = l.id WHERE v.name LIKE "%${keyword}%" AND category_id${category_id} AND location_id${location_id} ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;
  db.query(queryString, (err, result) => {
    if (err) return reject(err);
    const countString = `SELECT COUNT(id) AS total_data FROM vehicles WHERE name LIKE "%${keyword}%" AND category_id ${category_id} AND location_id ${location_id}`;
    db.query(countString, (error, countResult) => {
      if (error) return reject(error);
      const totalData = countResult[0].total_data;
      const totalPage = Math.ceil(totalData / limit);
      const baseURL = `/vehicles?limit=${limit}&`;
      let urlPrevPage = baseURL;
      let urlNextPage = baseURL;
      query.keyword && 
        ((urlPrevPage = urlPrevPage + `keyword=${keyword}&`),
        (urlNextPage = urlNextPage + `keyword=${keyword}&`));
      query.category_id
        && ((urlPrevPage = urlPrevPage + `category_id${category_id}&`),
        (urlNextPage = urlNextPage + `category_id${category_id}&`));
      query.location_id
        && ((urlPrevPage = urlPrevPage + `location_id${location_id}&`),
        (urlNextPage = urlNextPage + `location_id${location_id}&`));
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
    });
  });
});

const getVehicleById = (id) => new Promise((resolve, reject) => {
  const qs = 'SELECT v.id AS id, v.name AS name, c.name AS category, v.stock, v.description, l.name AS location, v.image, v.price, v.owner_id, bs.id AS status_id, bs.name AS book_status FROM vehicles v JOIN categories c ON v.category_id = c.id JOIN locations l ON v.location_id = l.id JOIN booking_status bs ON v.booking_status_id = bs.id WHERE v.id = ?';
  db.query(qs, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const updateVehicle = (file, id, body) => new Promise((resolve, reject) => {
  const getFileQuery = 'SELECT image FROM vehicles WHERE id = ?';

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
    const updateQuery = 'UPDATE vehicles SET ? WHERE id = ?';
    db.query(updateQuery, [newBody, id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
});

const deleteVehicle = (id) => new Promise((resolve, reject) => {
  const queryString = 'DELETE FROM vehicles WHERE id = ?';
  db.query(queryString, id, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

const getFavourites = (query) => new Promise((resolve, reject) => {
  let user_id = query.user_id;
  let category_id = '> 0';
  if(query?.category_id) category_id = `=${query.category_id}`;
  let location_id = '> 0';
  if(query?.location_id) location_id = `=${query.location_id}`;
  let order_by = query?.order_by ? query.order_by : 'vehicle_id';
  let sort = query?.sort ? query.sort : 'ASC';
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 4;
  const offset = limit * (page - 1);
  const queryString = `SELECT v.id AS vehicle_id, v.name AS name, v.image, v.description, v.category_id, l.name AS location, v.price, v.score AS score FROM user_vehicle uv JOIN vehicles v ON uv.vehicle_id = v.id JOIN locations l ON v.location_id = l.id WHERE uv.user_id = ${user_id} AND category_id${category_id} AND location_id${location_id} ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;
  db.query(queryString, (err, result) => {
    if (err) return reject(err);
    if (!result.length) return reject(404);
    const countString = `SELECT COUNT(uv.id) AS total_data FROM user_vehicle uv JOIN vehicles v ON uv.vehicle_id = v.id WHERE uv.user_id = ${user_id} AND v.category_id ${category_id} AND v.location_id ${location_id}`;
    db.query(countString, (error, countResult) => {
      if (error) return reject(error);
      const totalData = countResult[0].total_data;
      const totalPage = Math.ceil(totalData / limit);
      const baseURL = `/vehicles/like?limit=${limit}&`;
      let urlPrevPage = baseURL;
      let urlNextPage = baseURL;
      query.category_id
        && ((urlPrevPage = urlPrevPage + `category_id${category_id}&`),
        (urlNextPage = urlNextPage + `category_id${category_id}&`));
      query.location_id
        && ((urlPrevPage = urlPrevPage + `location_id${location_id}&`),
        (urlNextPage = urlNextPage + `location_id${location_id}&`));
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
    });
  });
});

const likeVehicle = (query) => new Promise((resolve, reject) => {
  const queryString = `INSERT INTO user_vehicle SET ?`;
  db.query(queryString, query, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

const unlikeVehicle = (query) => new Promise((resolve, reject) => {
  const user_id = query.user_id;
  const vehicle_id = query.vehicle_id;
  const queryString = `DELETE FROM user_vehicle WHERE user_id = ${user_id} AND vehicle_id = ${vehicle_id}`;
  db.query(queryString, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

module.exports = {
  addNewVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  likeVehicle,
  unlikeVehicle,
  getFavourites,
};
