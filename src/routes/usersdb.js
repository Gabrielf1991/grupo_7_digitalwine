const express = require('express');
const router = express.Router();
// const db = require('../database/models');

const usersController = require('../controllers/usersController');


router.get('/usersdb', usersController.list);


module.exports = router;