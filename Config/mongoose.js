const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function () {
    console.log('Connected to database: MongoDB');
});
module.exports = db;
