const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/search', mainController.search);

module.exports = router;
