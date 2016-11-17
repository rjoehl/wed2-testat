const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controller');
const noteFormController = require('../controllers/note-form-controller');

router.get('/', notesController);
router.get('/new', noteFormController);
router.post('/new', noteFormController);
router.get('/:noteId/edit', noteFormController);
router.post('/:noteId/edit', noteFormController);

module.exports = router;
