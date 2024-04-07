const router = require('express').Router();
const userController = require('../controllers/UserController');
router.get('/user', userController.getUser);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);
router.post('/user/login', userController.userLogin);

module.exports = router;