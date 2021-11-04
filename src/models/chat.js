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
                    // return resolve(insertResult);
                    const getUser = `SELECT name FROM users WHERE id = ?`;
                    db.query(getUser, sender, (err, userResult) => {
                        const sender_name = userResult[0].name;
                        socket.ioObject.emit(recipient, {
                            message: body.message,
                            sender_name,
                        });
                        return resolve('Chat posted.');
                    });
                });
            });
        });
    });
};

const getMessage = (query) => {
    return new Promise((resolve, reject) => {
        const sender = query.sender_id;
        const recipient = query.recipient_id;
        const queryGetMsg = `SELECT * FROM chat WHERE (sender_id = ? or recipient_id = ?) AND (sender_id = ? or recipient_id = ?) ORDER BY timestamp ASC`;
        db.query(queryGetMsg, [sender, sender, recipient, recipient], (err, result) => {
            if (err) return reject(err);
            if (!result[0]) return reject(404);
            return resolve(result);
        });
    });
};

const getChatRooms = (id) => {
    return new Promise((resolve, reject) => {
        const users_id = id;
        const getRoomsQuery = `SELECT c.id, c.message, s.id AS "sender_id", s.name AS "sender_name", r.id AS "recipient_id", r.name AS "recipient_name" FROM chat c JOIN users s ON c.sender_id = s.id JOIN users r ON c.recipient_id = r.id WHERE (c.sender_id = ? or c.recipient_id = ?) AND c.isLatest = 1`;
        db.query(getRoomsQuery, [users_id, users_id], (err, result) => {
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
