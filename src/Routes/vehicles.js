const vehicleRouter = require("express").Router();

const vehicleController = require("../Controllers/vehicles");

vehicleRouter.post("/", vehicleController.addNewVehicle);
vehicleRouter.get("/", vehicleController.getAllVehicles);
vehicleRouter.get("/search", vehicleController.findVehicle);
vehicleRouter.patch("/:id", vehicleController.updateVehicleRating);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

module.exports = vehicleRouter;