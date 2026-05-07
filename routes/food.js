const router = require('express').Router();
const foodController = require ('../controllers/foodController');
const {verifyVendor} = require('../middleware/verifyToken')

router.post('/', verifyVendor, foodController.addFood);
router.post('/tags/:id', verifyVendor, foodController.addFoodTag);
router.post('/type/:id', verifyVendor, foodController.addFoodType);
router.get('/:id', verifyVendor, foodController.getFoodById);
router.get('/:category/:code', verifyVendor, foodController.getRandomByCategoryAndCode);
router.delete("/:id", verifyVendor, foodController.deleteFoodById)
router.patch('/:id', verifyVendor, foodController.foodAvailability);
router.get('/restaurant/:restaurantId', verifyVendor, foodController.getFoodByRestaurant);


module.exports = router

