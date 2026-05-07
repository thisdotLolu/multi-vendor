const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');


router.post('/', verifyAndAuthorization, cartController.addProductToCart);
router.delete('/:id', verifyAndAuthorization, cartController.removeProductFromCart);
router.get('/', verifyAndAuthorization, cartController.fetchUserCart);
router.delete('/', verifyAndAuthorization, cartController.clearUserCart);
router.get('/count', verifyAndAuthorization, cartController.getCartCount);
router.patch('/decrement', verifyAndAuthorization, cartController.decrementProductQty);

module.exports = router 