const router = require('express').Router();
const accountController = require('../controllers/AccountController');
router.post('/account', accountController.addAccount);
router.get("/account", accountController.getAllAccounts);
router.get('/account/:id', accountController.getAccountById);
router.put('/account/:id', accountController.updateAccountById);
router.delete('/account/:id', accountController.deleteAccount);
module.exports = router;
