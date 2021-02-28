const express = require('express');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');

router.get('/dashboard', apiControllers.dashboard);
router.get('/users', apiControllers.list);


module.exports = router;
