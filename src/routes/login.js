const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();


router.get('/', usersController.login);
router.post('/', usersController.processLogin);


module.exports = router;
