const router = require("express").Router();
const restaurantController = require('../controllers/restaurantController')
const {verifyAndAuthorization, verifyVendor} = require('../middleware/verifyToken')

router.post('/', verifyAndAuthorization, restaurantController.addRestaurant);
router.get('/byId/:id', verifyAndAuthorization, restaurantController.getRestaurant);
router.get('/:code', verifyVendor, restaurantController.getRandomRestaurant);
router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant);
router.patch("/:id", verifyVendor, restaurantController.serviceAvailability);


module.exports = router