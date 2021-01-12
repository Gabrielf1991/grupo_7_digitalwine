const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../public/images/productos')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
const upload = multer({ storage: storage })
const productsController = require('../controllers/productsController');


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.any(), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/', productsController.list);
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.any(), productsController.update); 

/*** SEARCH ONE PRODUCT ***/
router.get('/search', productsController.search)


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.delete);

/*router.get('/', function(req, res, next) {
    res.render('products/products-list');
  });
  */
  module.exports = router;