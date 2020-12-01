const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/products', productsController.index);

/*** CREATE ONE PRODUCT ***/ 
router.get('/products/create', productsController.create); 
router.post('/products', /* upload.any() */ productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/products/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/products/:id/edit', productsController.edit); 
router.put('/products/:id', /* upload.any() */ productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/products/:id', productsController.destroy);

/*router.get('/', function(req, res, next) {
    res.render('products/products-list');
  });
  */
  module.exports = router;