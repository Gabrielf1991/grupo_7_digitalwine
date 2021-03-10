const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/profile', authMiddleware, usersController.showProfile)

// LogOut //

router.get('/logout', authMiddleware, usersController.logout)

module.exports = router;
