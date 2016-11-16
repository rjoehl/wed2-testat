const express = require('express');
const router = express.Router();
const noteFormController = require('../controllers/note-form');

router.get('/', noteFormController);

module.exports = router;
