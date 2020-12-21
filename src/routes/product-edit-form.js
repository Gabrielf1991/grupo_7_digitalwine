const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
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

  router.get('/:id', productsController.edit);
  router.put('/:id', upload.any(), productsController.update);
  
  module.exports = router;