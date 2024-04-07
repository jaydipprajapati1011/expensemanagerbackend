const router = require('express').Router();
const roleController = require('../controllers/RoleController');
router.get('/role', roleController.getAllRoles);
router.post('/role', roleController.addRole);
router.put('/role/:id', roleController.updateRole);
router.delete('/role/:id', roleController.deleteRole);
router.get('/role/:id', roleController.getRoleById);

module.exports = router;
