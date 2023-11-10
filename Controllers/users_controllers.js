const User = require('../Models/user');
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signUp', {
        title: 'Sign Up',
    });
};

module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signIn', {
        title: "Sign In",

    });
}


module.exports.create = async function (req, res) {
    try {
        console.log(req.body);

        if (req.body.password !== req.body.confirmPassword) {
            console.log('Passwords do not match');
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            console.log('User already exists');
            return res.redirect('back');
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await newUser.save();

        console.log('User created successfully');
        return res.redirect('/sign-in');
    } catch (error) {
        console.error("Error in creating new user", error);
        return res.status(500).send("Internal Server Error");
    }

};


module.exports.createSession = function (req, res) {
    try {
        const user = req.user; // Assuming req.user is the authenticated user object

        // Set a cookie named 'user_id' with the user's ID as the value
        res.cookie('user_id', user._id, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 1 day (optional)
            // Other cookie options can be added here
        });

        return res.redirect('/');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating session'
        });
    }
};

module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    return res.redirect('/sign-in');
}