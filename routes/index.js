const express = require('express');
const router = express.Router();
console.log('router loaded');
const homeController = require('../Controllers/home_controllers');
const adminRouter = require('./admin'); // Assuming './admin' is the correct path to your admin router

router.get('/', homeController.home);
router.get('/question/:id', homeController.getQuestionPage);

// Assuming '/admin' is the route you want to use for the adminRouter
router.use('/admin', adminRouter);

module.exports = router;
