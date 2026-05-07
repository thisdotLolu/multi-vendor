const router = require('express').Router();
const orderController = require('../controllers/ordersController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyAndAuthorization, orderController.placeholder)
router.get('/:id', verifyAndAuthorization, orderController.getOrderDetails);
router.get('user-orders', verifyAndAuthorization, orderController.getuserOrders)
router.post('/rate/:id', verifyAndAuthorization, orderController.rateOrder)
router.post('/status/:id', verifyAndAuthorization, orderController.updateOrderStatus)
router.post('/payment-status/:id', verifyAndAuthorization, orderController.updatePaymentStatus);

module.exports = router