const express = require('express');
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const router = express.Router();


router.get('/', guestMiddleware, usersController.login);
router.post('/', guestMiddleware, usersController.processLogin);


module.exports = router;
