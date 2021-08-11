const userRouter = require("express").Router();

const userController = require("../Controllers/users");

userRouter.post("/", userController.addNewUser);
userRouter.get("/", userController.getAllUsers);
userRouter.patch("/:id", userController.updateUserName);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;