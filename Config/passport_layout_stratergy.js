const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, done) {
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch(err => done(err));
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});



//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/sign-in');


}
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;

        // Check if the user's email contains the admin email
        const adminEmail = 'admin@example.com'; // Replace with your admin email
        if (req.user.email.includes(adminEmail)) {
            res.locals.isAdmin = true;
        } else {
            res.locals.isAdmin = false;
        }
    } else {
        res.locals.isAdmin = false;
    }

    next();
}



module.exports = passport;