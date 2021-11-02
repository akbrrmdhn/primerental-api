const authRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const authController = require('../controllers/auth');

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.delete('/logout', authController.logout);

module.exports = authRouter;
