const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');


router.get('/productsdb', productsController.list);


module.exports = router;