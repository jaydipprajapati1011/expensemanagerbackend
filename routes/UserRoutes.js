const router = require('express').Router();
const userController = require('../controllers/UserController');
const uploadController = require('../controllers/UploadController');

router.get('/user', userController.getUser);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);
router.post('/user/login', userController.userLogin);
router.post('/user/isuserexist', userController.isUserExist);
router.post('/user/resetpassword', userController.resetPassword);
// router.put("/user/:id", userController.upload.single('profilePicture'), userController.updateUserById)

module.exports = router;