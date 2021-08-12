const userRouter = require('express').Router();

const userController = require('../controllers/users');

userRouter.post('/', userController.addNewUser);
userRouter.patch('/password/:id', userController.updatePassword);
userRouter.patch('/:id', userController.updateProfile);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
