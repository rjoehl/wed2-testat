const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

/* GET home page. */
router.get('/', notesController);

module.exports = router;
