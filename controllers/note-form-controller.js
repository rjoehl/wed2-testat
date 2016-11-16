function noteFormController(req, res, next) {
    res.render('note-form', {
        title: 'Edit note'
    });
}

module.exports = noteFormController;
