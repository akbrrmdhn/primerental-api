const userRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/users');
const upload = require('../middlewares/upload');

// userRouter.post('/', userController.addNewUser);
userRouter.get('/', userController.getUserById);
userRouter.patch('/password/:id', userController.updatePassword);
userRouter.patch('/edituser/:id', upload.single('image'), userController.editUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/forgot-password', userController.forgotPassword);
userRouter.post('/forgot-password/code', userController.checkForgotPassword);
userRouter.patch('/forgot-password/change-password', userController.changePassword);

module.exports = userRouter;
