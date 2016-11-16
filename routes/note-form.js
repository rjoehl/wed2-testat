const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('note-form', {
        title: 'Edit note'
    });
});

module.exports = router;
