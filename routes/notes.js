const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('notes', {
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

module.exports = router;
