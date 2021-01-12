const express = require('express');
const router = express.Router();
// const db = require('../database/models');

const usersController = require('../controllers/usersController');


router.get('/', usersController.list);


module.exports = router;