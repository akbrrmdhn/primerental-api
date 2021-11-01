const chatModel = require('../models/chat');
const responseHelper = require('../helpers/response');

const postMessage = (req, res) => {
    const { body } = req;
    chatModel.postMessage(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((error) => responseHelper.error(res, 500, error))
}

const getMessage = (req, res) => {
    const { query } = req;
    chatModel.getMessage(query)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((error) => responseHelper.error(res, 500, error))
}

module.exports = {
    postMessage,
    getMessage,
}
