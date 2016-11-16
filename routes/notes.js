const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');
const noteFormController = require('../controllers/note-form');

router.get('/', notesController);
router.get('/:noteId/edit', noteFormController);

module.exports = router;
