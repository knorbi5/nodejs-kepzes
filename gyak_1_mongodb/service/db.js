const mongoose = require('mongoose');

mongoose.connect("...");

const bookModel = mongoose.model('book', {
    bookId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: false }
});

// adatbázis inicializálása
function initDatabase(cb) {
    return cb(false, { bookModel });
}

module.exports.initDatabase = initDatabase;