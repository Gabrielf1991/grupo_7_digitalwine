const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile/:id', authMiddleware, usersController.showProfile)

module.exports = router;
