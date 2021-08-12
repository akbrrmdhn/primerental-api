const historyRouter = require('express').Router();

const historyController = require('../controllers/histories');

historyRouter.post('/', historyController.addNewHistory);
historyRouter.get('/', historyController.getAllHistories);
historyRouter.get('/:id', historyController.getHistoryById);
historyRouter.patch('/:id', historyController.updateHistoryStatus);
historyRouter.delete('/:id', historyController.deleteHistory);
module.exports = historyRouter;
