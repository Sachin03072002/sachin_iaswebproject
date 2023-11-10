const Question = require('../Models/Question_module');


module.exports.addQuestionForm = async function (req, res) {
    return res.render('addQuestionFrom', {
        title: "Add-Question",

    });
}

module.exports.addQuestion = async function (req, res) {
    try {
        const newQuestion = new Question({
            title: req.body.title,
            questionText: req.body.questionText,
            answer: req.body.answer,
            image: req.file ? req.file.buffer : null,
            submitTime: new Date(),
            subject: req.body.subject,
            topic: req.body.topic,
        });

        await newQuestion.save();

        res.redirect('back');
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).send('Internal Server Error');
    }

}