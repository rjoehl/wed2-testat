const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const isAlternativeStyle = req.query.style === "alternative";
    res.render('notes', {
        title: "Notes",
        style: getStyle(isAlternativeStyle),
        otherStyle: getStyle(!isAlternativeStyle),
        notes: [
            {
                dueSentence: "",
                title: "Einkaufen",
                importanceStars: "*****",
                finishedChecked: "checked",
                description: "Pizza\nSchuhe\nSuesses",
            }, {
                dueSentence: "in a month",
                title: "Geburt von Sarah",
                importanceStars: "***",
                finishedChecked: "",
                description: "Anrufen",
            },
        ],
    });
});

function getStyle(isAlternativeStyle) {
    return isAlternativeStyle ? "alternative" : "standard";
}

module.exports = router;
