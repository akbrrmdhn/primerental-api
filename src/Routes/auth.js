const authRouter = require('express').Router();

const authController = require('../Controllers/auth');

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/logout', authController.logout);
module.exports = authRouter;
