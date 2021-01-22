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

router.get('/', productsController.create);
router.post('/', upload.any(), validator.create, productsController.store);
  
  module.exports = router;