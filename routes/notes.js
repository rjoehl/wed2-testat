const express = require('express');
const router = express.Router();

const Params = {
    ALTERNATIVE_STYLE: 'alternative-style'
};
let isAlternativeStyle = false;

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

    res.render('notes', {
        title: 'Notes',
        style: isAlternativeStyle ? 'alternative' : '',
        alternativeStyle: {
            value: !isAlternativeStyle,
            class: isAlternativeStyle ? 'active' : ''
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
