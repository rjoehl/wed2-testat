function retrieveNotes() {
    return [
        {
            title: 'Einkaufen',
            description: 'Pizza\nSchuhe\nSuesses',
            importance: 5,
            due: new Date(2016, 11, 12),
            finished: true
        }, {
            title: 'Geburt von Sarah',
            description: 'Anrufen',
            importance: 3,
            due: new Date(2016, 11, 19),
            finished: false
        }
    ];
}

module.exports = retrieveNotes;
