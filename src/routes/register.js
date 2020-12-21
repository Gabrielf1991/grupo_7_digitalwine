const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage: storage })


router.get('/', usersController.register);
router.post('/', upload.any(), usersController.store);

module.exports = router;
