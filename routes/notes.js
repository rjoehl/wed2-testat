const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

router.get('/', notesController);

module.exports = router;
