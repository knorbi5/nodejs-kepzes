const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./service/db');
const addRoutes = require('./route');

// inicializáljuk az express-t
const app = express();

// beállítjuk a json body parser-t (ezzel a req.body objektum tartalmazza a request-ben megadott JSON kulcs/érték párokat)
app.use(bodyParser.json());

// adatbázis inicializálása, route-ok hozzáadása, api futtatása
initDatabase((err, { bookModel }) => {
    if (err) {
        return console.error(err);
    }

    addRoutes(app, bookModel);

    // api futtatása
    app.listen(6001, () => {
        console.log('The app is running!');
    });
});