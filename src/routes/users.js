const userRouter = require('express').Router();
const userController = require('../controllers/users');
const upload = require('../middlewares/upload');

// userRouter.post('/', userController.addNewUser);
userRouter.get('/', userController.getUserById);
userRouter.patch('/edituser/', upload.single('image'), userController.editUser);
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;
