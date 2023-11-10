const Question = require('../Models/Question_module');

module.exports.home = async function (req, res) {
    try {
        const latestQuestions = await Question.find().sort({ submitTime: -1 }).limit(10);

        return res.render('home', {
            title: "Home",
            questions: latestQuestions
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }

}
module.exports.getQuestionPage = async function (req, res) {
    try {
        const question = await Question.findById(req.params.id);
        res.render('Question-page', {
            title: 'Question | ' + question.title,
            question: question
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }

}