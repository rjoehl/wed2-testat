const notesStore = require('../services/notes-store');

const noteFormController = {
    getNewNoteForm(req, res, next) {
        res.render('note-form', {
            title: 'Create note',
            note: {},
            saveText: 'Create'
        });
    },
    createNote(req, res, next) {
        const finished = req.body.finished === 'on';
        notesStore.save({
            created: new Date(),
            title: req.body.title,
            description: req.body.description,
            importance: parseInt(req.body.importance, 10),
            due: new Date(req.body.due),
            finished: finished,
            finish: finished ? new Date() : null
        });
        res.redirect('/');
    },
    getEditNoteForm(req, res, next) {
        notesStore.get(req.params.noteId, function (err, note) {
            if (note == null) {
                res.redirect('/');
                return;
            }
            res.render('note-form', {
                title: 'Edit note',
                note: Object.assign(note, {
                    created: note.created ? note.created.toISOString().split('T')[0] : null,
                    due: note.due ? note.due.toISOString().split('T')[0] : null,
                    finishedChecked: note.finished ? 'checked' : '',
                    finish: note.finish ? note.finish.toISOString().split('T')[0] : null
                }),
                saveText: 'Save'
            });
        })
    },
    editNote(req, res, next) {
        notesStore.save({
            _id: req.params.noteId,
            created: new Date(req.body.created),
            title: req.body.title,
            description: req.body.description,
            importance: parseInt(req.body.importance, 10),
            due: new Date(req.body.due),
            finished: req.body.finished === 'on',
            finish: req.body.finished ?
                (req.body.finish != null ? new Date(req.body.finish) : new Date()) : null
        });
        res.redirect('/');
    }
};

module.exports = noteFormController;
