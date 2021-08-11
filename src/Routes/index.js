const mainRouter = require("express").Router();

const pingRouter = require("./ping");
const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const historyRouter = require("./histories");

mainRouter.use("/", pingRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/histories", historyRouter);

module.exports = mainRouter;