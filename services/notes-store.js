const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

const notesStore = {
    query(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    },
    get(id, callback) {
        db.findOne({ _id: id }, function (err, doc) {
            callback(err, doc);
        });
    },
    save(note) {
        if (note._id != null) {
            db.update({ _id: note._id }, note);
        } else {
            db.insert(note);
        }
    }
};

module.exports = notesStore;
