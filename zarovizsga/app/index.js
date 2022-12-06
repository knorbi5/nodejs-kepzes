const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { initDatabase } = require('./services/db');
const addRoutes = require('./router');

// inicializáljuk az express-t
const app = express();

// beállítjuk a json body parser-t (ezzel a req.body objektum tartalmazza a request-ben megadott JSON kulcs/érték párokat)
app.use(bodyParser.urlencoded({extended: false}));

// statikus middleware-ek (bootstrap css, js, saját css stb.)
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

// session konfigurálása
app.use(
    session({
        secret: '95118985D3BD6D41',
        resave: false,
        saveUninitialized: true
    })
);

// adatbázis inicializálása, route-ok hozzáadása, api futtatása
initDatabase((err, { db, userModel, tweetModel }) => {
    if (err) {
        return console.error(err);
    }

    // route-ok hozzáadása
    addRoutes(app, db, userModel, tweetModel);

    // app futtatása
    const port = 6001;
    app.listen(port, () => {
        console.log('The app is running on port: ' + port);
    });
});