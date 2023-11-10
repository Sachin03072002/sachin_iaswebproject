const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters long'],
    },
    name: {
        type: String,
        required: true,
    },
});

// Hash the password before saving it to the database
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// Define a method to validate the user's password
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
