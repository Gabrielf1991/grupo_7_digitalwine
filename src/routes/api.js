const express = require('express');
const router = express.Router();
const usersController = require('../controllers/Api/usersController');
const productsController = require('../controllers/Api/productsController');

router.get('/products', productsController.productsList);
router.get('/products/:id', productsController.detail);
router.get('/users', usersController.usersList);
router.get('/users/:id', usersController.detail);



module.exports = router;
