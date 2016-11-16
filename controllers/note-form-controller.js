const notesStore = require('../services/notes-store');

function noteFormController(req, res, next) {
    switch (req.method) {
        case 'GET':
            res.render('note-form', {
                title: 'Create note'
            });
            break;
        case 'POST':
            notesStore.save({
                title: req.body.title,
                description: req.body.description,
                importance: parseInt(req.body.importance, 10),
                due: new Date(req.body.due),
                finished: req.body.finished === 'on'
            });
            res.redirect('/');
            break;
    }
}

module.exports = noteFormController;
