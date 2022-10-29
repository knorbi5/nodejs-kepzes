const loki = require('lokijs');

// létrehozzuk a db-t
const db = new loki('book.db');

// adatbázis inicializálása, és feltöltése példa adatokkal
function initDatabase(cb) {
    db.loadDatabase({}, err => {
        if (err) {
            return cb(err);
        }

        let bookModel = db.getCollection('books');
        if (bookModel === null) {
            bookModel = db.addCollection('books');
        }

        // példa adatok
        /*bookModel.insert({bookId: 1, title: 'Első könyv címe', price: 25000});
        bookModel.insert({bookId: 2, title: 'Második könyv címe', price: 50000});
        bookModel.insert({bookId: 3, title: 'Harmadik könyv címe', price: 75000});
        bookModel.insert({bookId: 4, title: 'Negyedik könyv címe', price: 100000});*/

        db.saveDatabase(err => {
            console.log("db saved...");
            cb(err, { db, bookModel });
        });
    });
}

module.exports.initDatabase = initDatabase;