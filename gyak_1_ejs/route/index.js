const uuid = require('uuid');

// middleware-ek
const getBooksMW = require('../middleware/getBooks');
const getBookListMW = require('../middleware/getBookList');
const getBookByIdMW = require('../middleware/getBookById');
const getBookByTitleMW = require('../middleware/getBookByTitle');
const insertBookMW = require('../middleware/insertBook');
const updateBookMW = require('../middleware/updateBook');
const removeBookMW = require('../middleware/removeBook');

// route-ok hozzáadása
function addRoutes(app, db, bookModel, ejs) {
    // object repository - ebben gyűjtjük a middleware-ek által közösen használt objektumokat, így nem kell egyesével behívni őket minden middleware-ben
    const objRep = {
        db,
        bookModel,
        uuid
    };

    app.get('/book', getBooksMW(objRep));
    app.get('/bookList', getBookListMW(objRep));
    // mivel a getBookByIdMW be van kötve a middleware lánc első elemeként, ezért a következő middleware-ben elérjük a res.locals-ba helyezett book objektumot
    app.get('/book/:id', getBookByIdMW(objRep), (req, res, next) => res.json(res.locals.book));
    app.get('/getBookByTitle', getBookByTitleMW(objRep));
    app.put('/book', insertBookMW(objRep));
    app.patch('/book/:id', getBookByIdMW(objRep), updateBookMW(objRep));
    app.delete('/book/:id', getBookByIdMW(objRep), removeBookMW(objRep));
}

module.exports = addRoutes;