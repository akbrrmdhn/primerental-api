const vehicleRouter = require('express').Router();

const vehicleController = require('../controllers/vehicles');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');

vehicleRouter.post('/like', authMiddleware.checkToken, vehicleController.likeVehicle);
vehicleRouter.post('/', authMiddleware.checkToken, upload.single('image'), vehicleController.addNewVehicle);
vehicleRouter.get('/like', vehicleController.getFavourites)
vehicleRouter.get('/', vehicleController.getVehicles);
vehicleRouter.get('/score', vehicleController.getByScore);
vehicleRouter.get('/:id', vehicleController.getVehicleById);
vehicleRouter.patch('/:id', upload.single('image'), vehicleController.updateVehicle);
vehicleRouter.delete('/like', authMiddleware.checkToken, vehicleController.unlikeVehicle);
vehicleRouter.delete('/:id', vehicleController.deleteVehicle);

module.exports = vehicleRouter;

// authMiddleware.checkToken
