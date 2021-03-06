const express = require('express');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');

router.get('/products-list', apiControllers.productsList);
router.get('/users-list', apiControllers.usersList);


module.exports = router;
