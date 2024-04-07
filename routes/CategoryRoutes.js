const router = require('express').Router();
const categoryController = require('../controllers/CategoryController');
router.post('/category', categoryController.createCategory);
router.get("/category", categoryController.getCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', categoryController.updateCategoryById);
router.delete('/category/:id', categoryController.deleteCategoryById);

module.exports = router;
