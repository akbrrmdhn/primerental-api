const chatModel = require('../models/chat');
const responseHelper = require('../helpers/response');

const postMessage = (req, res) => {
    const { body } = req;
    chatModel.postMessage(body)
    .then((result) => responseHelper.success(res, "Message sent", 200, result))
    .catch((error) => responseHelper.error(res, "Failed to send message", 500, error))
}

const getMessage = (req, res) => {
    const { query } = req;
    chatModel.getMessage(query)
    .then((result) => responseHelper.success(res, "Messages fetched", 200, result))
    .catch((error) => responseHelper.error(res, "Failed to fetch messages", 500, error))
}

const getChatRooms = (req, res) => {
    const { params } = req;
    chatModel.getChatRooms(params.id)
    .then((result) => responseHelper.success(res, "Rooms fetched", 200, result))
    .catch((error) => responseHelper.error(res, "Failed to fetch Rooms", 500, error))
}

module.exports = {
    postMessage,
    getMessage,
    getChatRooms,
}