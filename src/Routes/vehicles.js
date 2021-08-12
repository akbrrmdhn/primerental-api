const vehicleRouter = require('express').Router();

const vehicleController = require('../Controllers/vehicles');
const upload = require('../Middlewares/upload');
const authMiddleware = require('../Middlewares/auth');

vehicleRouter.post('/', vehicleController.addNewVehicle);
vehicleRouter.get('/', vehicleController.getAllVehicles);
vehicleRouter.get('/search', vehicleController.findVehicle);
vehicleRouter.patch('/:id', upload.single('image'), vehicleController.updateVehicle);
vehicleRouter.delete('/:id', vehicleController.deleteVehicle);

module.exports = vehicleRouter;

// authMiddleware.checkToken
