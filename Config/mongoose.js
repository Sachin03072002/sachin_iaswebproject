const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MongoDB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connection to mongodb"));
db.once('open', function () {
    console.log('connected to database: mongodb');
});
module.exports = db;