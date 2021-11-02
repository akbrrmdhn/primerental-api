const socket = require('../../index');
const db = require('../database/mysql');

const postMessage = (body) => {
    return new Promise((resolve, reject) => {
        const sender = body.sender_id;
        const recipient = body.recipient_id;
        const getLastMessageSent = `SELECT MAX(id) as most_recent_msg FROM chat WHERE (sender_id = ? or recipient_id = ?) AND (sender_id = ? or recipient_id = ?)`;
        db.query(getLastMessageSent, [sender, sender, recipient, recipient], (err, getMsgResult) => {
            if (err) return reject(err);
            const replaceLastMsg = `UPDATE chat SET isLatest = 0 WHERE id = ?`;
            db.query(replaceLastMsg, getMsgResult[0].most_recent_msg, (err, res) => {
                if (err) return reject(err);
                const newMessage = {...body, ...{isLatest: 1},};
                const insertMsg = `INSERT INTO chat SET ?`;
                db.query(insertMsg, newMessage, (err, insertResult) => {
                    if (err) return reject(err);
                    return resolve(insertResult);
                })
            })
        })
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
        const queryGetMsg = `SELECT * FROM chat WHERE (sender_id = ? or recipient_id = ?) AND (sender_id = ? or recipient_id = ?) ORDER BY timestamp ASC`;
        db.query(queryGetMsg, [sender_id, sender_id, recipient_id, recipient_id], (err, result) => {
            if (err) return reject(err);
            if (!result[0]) return reject(404);
            return resolve(result);
        });
    });
};

const getChatRooms = (id) => {
    return new Promise((resolve, reject) => {
        const user_id = id;
        const getRoomsQuery = `SELECT * FROM chat c JOIN users s ON c.sender_id = s.id JOIN users r ON c.recipient_id = r.id WHERE (c.sender_id = ? or c.recipient_id = ?) AND c.isLatest = 1`;
        db.query(getRoomsQuery, [user_id, user_id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

module.exports = {
    postMessage,
    getMessage,
    getChatRooms,
}
