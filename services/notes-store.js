const Datastore = require('nedb');
const db = new Datastore({filename: './data/notes.db', autoload: true});

const notesStore = {
    query({showFinished = false, sort = {}}, callback) {
        const query = {};
        if (!showFinished) {
            query.$not = {finished: true}
        }
        let cursor = db.find(query);
        if ('by' in sort) {
            cursor.sort({[sort.by]: sort.order === 'desc' ? -1 : 1});
        }
        cursor.exec(function (err, docs) {
            callback(err, docs);
        });
    },
    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    },
    save(note) {
        if (note._id != null) {
            db.update({_id: note._id}, note);
        } else {
            db.insert(note);
        }
    }
};

module.exports = notesStore;
