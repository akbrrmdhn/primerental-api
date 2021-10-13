const userRouter = require('express').Router();

const userController = require('../controllers/users');
const upload = require('../middlewares/upload');

// userRouter.post('/', userController.addNewUser);
userRouter.get('/:id', userController.getUserById);
userRouter.patch('/password/:id', userController.updatePassword);
userRouter.patch('/edituser/:id', upload.single('image'), userController.editUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
