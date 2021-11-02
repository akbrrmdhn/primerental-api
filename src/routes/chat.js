const chatRouter = require('express').Router();
const chatController = require('../controllers/chat');

chatRouter.post('/', chatController.postMessage);
chatRouter.get('/rooms/:id', chatController.getChatRooms);
chatRouter.get('/', chatController.getMessage);


module.exports = chatRouter;
