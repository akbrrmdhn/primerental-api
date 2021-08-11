const pingRouter = require("express").Router();

const pingHandler = require("../controllers/ping");

pingRouter.get("/", pingHandler.greeting);

module.exports = pingRouter;