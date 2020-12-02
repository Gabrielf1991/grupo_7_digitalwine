const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
/*router.get('/', function(req, res, next) {
    res.render('products/product-edit-form');
  });
  */

  router.get('/:id', productsController.edit);
  router.put('/:id', productsController.update);
  
  module.exports = router;