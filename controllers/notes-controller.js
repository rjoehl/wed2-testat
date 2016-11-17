const notesStore = require('../services/notes-store');

const Params = {
    ALTERNATIVE_STYLE: 'alternative-style',
    ORDER_BY: 'order-by',
    SHOW_FINISHED: 'show-finished'
};

function notesController(req, res, next) {
    const sess = req.session;
    if (req.query.hasOwnProperty(Params.ALTERNATIVE_STYLE)) {
        const value = req.query[Params.ALTERNATIVE_STYLE];
        if (value === 'true') {
            sess.isAlternativeStyle = true;
        } else if (value === 'false') {
            sess.isAlternativeStyle = false;
        }
    }
    if (sess.isAlternativeStyle == null) {
        sess.isAlternativeStyle = false;
    }
    const isAlternativeStyle = sess.isAlternativeStyle;

    if (req.query.hasOwnProperty(Params.ORDER_BY)) {
        const value = req.query[Params.ORDER_BY];
        const [attribute, order] = value.split('-');
        if (attribute === 'finish' || attribute === 'created' || attribute === 'importance') {
            if (order === 'asc' || order == 'desc') {
                sess.sort = {
                    by: attribute,
                    order: order
                };
            }
        }
    }
    if (sess.sort == null) {
        sess.sort = {};
    }
    const sort = sess.sort;

    if (req.query.hasOwnProperty(Params.SHOW_FINISHED)) {
        const value = req.query[Params.SHOW_FINISHED];
        if (value === 'true') {
            sess.showFinished = true;
        } else if (value === 'false') {
            sess.showFinished = false;
        }
    }
    if (sess.showFinished == null) {
        sess.showFinished = false;
    }
    const showFinished = sess.showFinished;

    notesStore.query({showFinished, sort}, function (err, notes) {
        res.render('notes', {
            title: 'Notes',
            style: isAlternativeStyle ? 'alternative' : 'standard',
            alternativeStyle: {
                value: !isAlternativeStyle,
                class: isAlternativeStyle ? 'active' : ''
            },
            orderBy: {
                finish: {
                    value: 'finish-' + (sort.order === 'asc' ? 'desc' : 'asc'),
                    class: sort.by === 'finish' ? 'active' : ''
                },
                created: {
                    value: 'created-' + (sort.order === 'asc' ? 'desc' : 'asc'),
                    class: sort.by === 'created' ? 'active' : ''
                },
                importance: {
                    value: 'importance-' + (sort.order === 'asc' ? 'desc' : 'asc'),
                    class: sort.by === 'importance' ? 'active' : ''
                }
            },
            showFinished: {
                value: !showFinished,
                class: showFinished ? 'active' : '',
                text: !showFinished ? 'Show finished' : 'Hide finished'
            },
            notes: notes.map(function (note) {
                return {
                    due: note.due ? note.due.toDateString() : 'Someday',
                    title: note.title,
                    importanceStars: '*'.repeat(parseInt(note.importance, 10)),
                    finishedChecked: note.finished ? 'checked' : '',
                    description: note.description,
                    id: note._id
                };
            })
        });
    });
}

module.exports = notesController;
