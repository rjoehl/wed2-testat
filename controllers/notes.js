let isAlternativeStyle = false;
let sort = {};
let showFinished = false;

const Params = {
    ALTERNATIVE_STYLE: 'alternative-style',
    ORDER_BY: 'order-by',
    SHOW_FINISHED: 'show-finished'
};

function notesController(req, res, next) {
    if (req.query.hasOwnProperty(Params.ALTERNATIVE_STYLE)) {
        const value = req.query[Params.ALTERNATIVE_STYLE];
        if (value === 'true') {
            isAlternativeStyle = true;
        } else if (value === 'false') {
            isAlternativeStyle = false;
        }
    }

    if (req.query.hasOwnProperty(Params.ORDER_BY)) {
        const value = req.query[Params.ORDER_BY];
        const [attribute, order] = value.split('-');
        if (attribute === 'finish' || attribute === 'created' || attribute === 'importance') {
            if (order === 'asc' || order == 'desc') {
                sort = {
                    by: attribute,
                    order: order
                };
            }
        }
    }

    if (req.query.hasOwnProperty(Params.SHOW_FINISHED)) {
        const value = req.query[Params.SHOW_FINISHED];
        if (value === 'true') {
            showFinished = true;
        } else if (value === 'false') {
            showFinished = false;
        }
    }

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
        notes: [
            {
                dueSentence: '',
                title: 'Einkaufen',
                importanceStars: '*****',
                finishedChecked: 'checked',
                description: 'Pizza\nSchuhe\nSuesses'
            }, {
                dueSentence: 'in a month',
                title: 'Geburt von Sarah',
                importanceStars: '***',
                finishedChecked: '',
                description: 'Anrufen'
            }
        ]
    });
}

module.exports = notesController;
