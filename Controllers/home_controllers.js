const express = require('express');
const router = express.Router();

module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Home",
        content: "Hello Truly IAS"
    });
}