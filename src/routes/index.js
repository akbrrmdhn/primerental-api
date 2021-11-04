const mainRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const pingRouter = require('./ping');
const userRouter = require('./users');
const vehicleRouter = require('./vehicles');
const historyRouter = require('./histories');
const authRouter = require('./auth');
const chatRouter = require('./chat');

mainRouter.use('/', pingRouter);
mainRouter.use('/users', authMiddleware.checkToken, userRouter);
mainRouter.use('/vehicles', vehicleRouter);
mainRouter.use('/histories', historyRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/chat', chatRouter);

module.exports = mainRouter;
