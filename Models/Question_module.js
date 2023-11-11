const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: String,
    questionText: String,
    image: Buffer,
    answer: String,
    submitTime: Date,
    subject: String,
    topic: String,
}, {
    timestamps: true
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;