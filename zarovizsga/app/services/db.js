const loki = require('lokijs');

// létrehozzuk a db-t
const db = new loki('tweet_clone.db');

// adatbázis inicializálása, és feltöltése példa adatokkal
function initDatabase(cb) {
    db.loadDatabase({}, err => {
        if (err) {
            return cb(err);
        }

        let userModel = db.getCollection('users');
        if (userModel === null) {
            userModel = db.addCollection('users');
        }

        let tweetModel = db.getCollection('tweets');
        if (tweetModel === null) {
            tweetModel = db.addCollection('tweets');
        }

        db.saveDatabase(err => {
            console.log("db saved...");
            cb(err, { db, userModel, tweetModel });
        });
    });
}

module.exports.initDatabase = initDatabase;