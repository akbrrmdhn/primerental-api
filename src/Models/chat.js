const socket = require('../../index');
const db = require('../database/mysql');

const postMessage = (body) => {
    return new Promise((resolve, reject) => {
        const queryPostMsg = `INSERT INTO chat SET ?`;
        db.query(queryPostMsg, body, (err, result) => {
            if(err) return reject(err);
            return resolve(result);
        });
    });
};

const getMessage = (query) => {
    return new Promise((resolve, reject) => {
        const sender_id = query.sender_id;
        const recipient_id = query.recipient_id;
        const queryGetMsg = `SELECT * FROM chat WHERE (sender_id = ? or recipient_id = ?) AND (sender_id = ? or recipient_id = ?)`;
        db.query(queryGetMsg, [sender_id, sender_id, recipient_id, recipient_id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

module.exports = {
    postMessage,
    getMessage,
}