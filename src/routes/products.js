const express = require('express');
const productsController = require('../controllers/productsController');
const validator = require('../middlewares/validator');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
const upload = multer({ storage: storage })


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/create', upload.any(), validator.create, productsController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/', productsController.list);

router.get('/tintos', productsController.showTintos);
router.get('/blancos', productsController.showBlancos);
router.get('/rosados', productsController.showRosados);
router.get('/espumantes', productsController.showEspumantes);
router.get('/espirituosas', productsController.showEspirituosas);
router.get('/combos', productsController.showCombos);


router.get('/:id', productsController.detail); 
router.get('/combos/:id', productsController.detail);

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