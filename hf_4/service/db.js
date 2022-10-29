const loki = require('lokijs');

// létrehozzuk a db-t
const db = new loki('todo.db');

// adatbázis inicializálása, és feltöltése példa adatokkal
function initDatabase(cb) {
    db.loadDatabase({}, err => {
        if (err) {
            return cb(err);
        }

        let todoModel = db.getCollection('todo');
        if (todoModel === null) {
            todoModel = db.addCollection('todo');
        }

        db.saveDatabase(err => {
            console.log("db saved...");
            cb(err, { db, todoModel });
        });
    });
}

module.exports.initDatabase = initDatabase;