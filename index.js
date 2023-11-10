const express = require("express");
const app = express();
const path = require('path');
const port = 8000;
const multer = require('multer');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const db = require('./Config/mongoose');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in connection to the server: ${err}`);
    }
    console.log(`Server started at localhost://${port}`);
});
