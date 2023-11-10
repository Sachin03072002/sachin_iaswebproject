const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
const port = 8000;
const cookieParser = require('cookie-parser');
const multer = require('multer');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require(('express-session'));
const passport = require('passport');
const passportLocal = require('./Config/passport_layout_stratergy');
const passportJWT = require('./Config/passport-jwt-stratergy');
const MongoStore = require('connect-mongo');

const db = require('./Config/mongoose');
const customM = require('./Config/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100 // 1 hour
    },
    store: new MongoStore(
        {
            mongoUrl: process.env.MongoDB_URL,
            autoRemove: 'disabled'
        }
        , function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in connection to the server: ${err}`);
    }
    console.log(`Server started at localhost://${port}`);
});
