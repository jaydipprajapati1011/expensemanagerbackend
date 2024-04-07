const router = require('express').Router();
const subcategoryController = require('../controllers/SubCategoryController');

router.get('/subcategory', subcategoryController.getAllSubCategory);
router.post('/subcategory', subcategoryController.addSubCategory);
router.get('/subcategory/:id', subcategoryController.getSubCategoryById);
router.put('/subcategory/:id', subcategoryController.updateSubCategory);
router.delete('/subcategory/:id', subcategoryController.deleteSubCategory);

module.exports = router;
