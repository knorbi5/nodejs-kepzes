const uuid = require('uuid');

// middleware-ek
const getTodosMW = require('../middleware/getTodos');
const getTodoByIdMW = require('../middleware/getTodoById');
const insertTodoMW = require('../middleware/insertTodo');
const updateTodoMW = require('../middleware/updateTodo');
const removeTodoMW = require('../middleware/removeTodo');

// route-ok hozzáadása
function addRoutes(app, db, todoModel) {
    // object repository - ebben gyűjtjük a middleware-ek által közösen használt objektumokat,
    // így nem kell egyesével behívni őket minden middleware-ben
    const objRep = {
        db,
        todoModel,
        uuid
    };

    app.get('/todo', getTodosMW(objRep));
    // mivel a getTodoByIdMW be van kötve a middleware lánc első elemeként,
    // ezért a következő middleware-ben elérjük a res.locals-ba helyezett todo objektumot
    app.get('/todo/:id', getTodoByIdMW(objRep), (req, res, next) => res.json(res.locals.todo));
    app.put('/todo', insertTodoMW(objRep));
    app.patch('/todo/:id', getTodoByIdMW(objRep), updateTodoMW(objRep));
    app.delete('/todo/:id', getTodoByIdMW(objRep), removeTodoMW(objRep));
}

module.exports = addRoutes;