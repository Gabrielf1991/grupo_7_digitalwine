const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

/*router.get('/', function(req, res, next) {
    res.render('products/products-list');
  });
  */
  module.exports = router;