const express = require('express');
const router = express.Router();
const passport = require('passport');
console.log('router loaded');
const homeController = require('../Controllers/home_controllers');
const userController = require('../Controllers/users_controllers');
const adminRouter = require('./admin'); // Assuming './admin' is the correct path to your admin router

router.get('/', homeController.home);
router.get('/question/:id', homeController.getQuestionPage);

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

// Use '/sign-in' instead of '/create-session' for the Passport Local Strategy
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/sign-in' },
), userController.createSession);



router.get('/sign-out', userController.destroySession);

// Assuming '/admin' is the route you want to use for the adminRouter
router.use('/admin', adminRouter);

module.exports = router;
