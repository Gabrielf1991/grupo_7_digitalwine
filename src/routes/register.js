const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validator = require('../middlewares/validator');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage: storage })


router.get('/', guestMiddleware, usersController.register);
router.post('/', upload.any(), validator.register, usersController.store);

module.exports = router;
