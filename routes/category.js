const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { verifyAdmin } = require('../middleware/verifyToken');

router.get('/', categoryController.getAllCategories);
router.put('/:id', verifyAdmin, categoryController.updateCategory);
router.post('/', verifyAdmin, categoryController.createCategory);
router.delete('/:id', verifyAdmin, categoryController.deleteCategory);
router.patch('/image/:id', verifyAdmin, categoryController.patchCategoryImage);
router.get('/random', categoryController.getRandomCategories);

module.exports = router;