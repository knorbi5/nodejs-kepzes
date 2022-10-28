const express = require('express');
const bodyParser = require('body-parser');
const {initDatabase} = require('./service/db');
const addRoutes = require('./route');

// inicializáljuk az express-t
const app = express();

// beállítjuk a json body parser-t (ezzel a req.body objektum tartalmazza a megadott kulcs/érték párokat)
app.use(bodyParser.json());

// adatbázis inicializálása, route-ok hozzáadása, api futtatása
initDatabase((err, {db, bookModel}) => {
    if(err) {
        return console.error(err);
    }

    addRoutes(app, db, bookModel);

    // api futtatása
    app.listen(6000, () => {
        console.log('The app is running!');
    });
});