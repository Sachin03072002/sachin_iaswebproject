const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../Controllers/admin_controllers');
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });
router.get('/add-question-form', adminController.addQuestionForm);
router.post('/add-question', upload.single('image'), adminController.addQuestion);
module.exports = router;