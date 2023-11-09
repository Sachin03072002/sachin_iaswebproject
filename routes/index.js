const express = require('express');
const router = express.Router();
console.log('router loaded');
const homeController = require('../Controllers/home_controllers');

router.get('/', homeController.home);


module.exports = router;