const express = require('express');
const router = express.Router();

let isAlternativeStyle = false;
let showFinished = false;

const Params = {
    ALTERNATIVE_STYLE: 'alternative-style',
    SHOW_FINISHED: 'show-finished'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.hasOwnProperty(Params.ALTERNATIVE_STYLE)) {
        const value = req.query[Params.ALTERNATIVE_STYLE];
        if (value === 'true') {
            isAlternativeStyle = true;
        } else if (value === 'false') {
            isAlternativeStyle = false;
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
        style: isAlternativeStyle ? 'alternative' : '',
        alternativeStyle: {
            value: !isAlternativeStyle,
            class: isAlternativeStyle ? 'active' : ''
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
});

module.exports = router;
