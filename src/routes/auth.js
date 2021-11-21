const authRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const authController = require('../controllers/auth');

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.delete('/logout', authMiddleware.checkToken, authController.logout);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/forgot-password/code', authController.checkForgotCode);
authRouter.patch('/forgot-password/change-password', authController.changePassword);
authRouter.patch('/change-pass', authMiddleware.checkToken, authController.changePassword);

module.exports = authRouter;
