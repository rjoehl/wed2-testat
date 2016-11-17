const notesStore = require('../services/notes-store');

function noteFormController(req, res, next) {
    switch (req.method) {
        case 'GET':
            if (req.params.noteId) {
                notesStore.get(req.params.noteId, function (err, note) {
                    res.render('note-form', {
                        title: 'Create note',
                        note: note
                    });
                })
            } else {
                res.render('note-form', {
                    title: 'Create note',
                    note: {}
                });
            }
            break;
        case 'POST':
            notesStore.save({
                _id: req.params.noteId,
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
