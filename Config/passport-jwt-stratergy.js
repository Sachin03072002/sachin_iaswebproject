const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../Models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}
passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (err) {
        console.log('Error:', err);
        return done(err, false);
    }
}));

module.exports = passport;