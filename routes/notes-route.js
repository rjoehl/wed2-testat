const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controller');
const noteFormController = require('../controllers/note-form-controller');

router.get('/', notesController);
router.get('/new', noteFormController.getNewNoteForm);
router.post('/new', noteFormController.createNote);
router.get('/:noteId/edit', noteFormController.getEditNoteForm);
router.post('/:noteId/edit', noteFormController.editNote);

module.exports = router;
