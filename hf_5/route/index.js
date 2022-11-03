const session = require('express-session');
const homeMW = require('../middleware/home');
const increaseMW = require('../middleware/increase');
const newSessionMW = require('../middleware/newSession');

function addRoutes(app) {
    // session inicializálása
    app.use(session({
        secret: 'e4Z9kf0WYsIzArwwMAZ6',
        resave: false,
        saveUninitialized: true,
    }));

    // nyitólap
    app.get('/', homeMW);

    // szám növelése
    app.get('/increase', increaseMW);

    // új munkamenet (session)
    app.get('/newSession', newSessionMW);
}

module.exports = addRoutes;